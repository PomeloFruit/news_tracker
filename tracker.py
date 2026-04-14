import os
import pathlib
import json
import hashlib
import requests
from datetime import datetime, timedelta
from config import TOPICS

API_KEY = os.environ["NEWSAPI_KEY"]
BASE_URL = "https://newsapi.org/v2/everything"
ARTICLE_FILE = "collected_articles.json"

# Load collected articles from given filepath
def load_seen(filepath):
    file = pathlib.Path(filepath)
    if file.exists(): 
        with open(file, "r") as f:
            return json.load(f)
    return []

# Save the collected articles from seen_articles
def save_seen(filepath, seen_articles):
    file = pathlib.Path(filepath)
    with open(file, "w") as f:
        json.dump(seen_articles, f)
    return

# Hash an article's URL to create a unique identifier 
# for it to use as an ID in the ARTICLE_FILE
def hash_article(article):
    url = article.get("url", "")
    return hashlib.sha256(url.encode()).hexdigest()

# Call NewsAPI for the relevant articles of a given topic
def fetch_articles(query):
    """
    The 'from' parameter limits results to the last 24 hours.
    'sortBy=publishedAt' ensures newest articles come first.
    'pageSize=10' keeps us well within the free tier limits.
    """
    yesterday = (datetime.now() - timedelta(days=1)).strftime("%Y-%m-%dT%H:%M:%S")
    response = requests.get(BASE_URL,
        params={
            "q": query,
            "from": yesterday,
            "sortBy": "publishedAt",
            "language": "en",
            "apiKey": API_KEY
        }
    )

    if response.status_code != 200:
        print(f"Error fetching '{query}': {response.status_code} - {response.text}")
        return []
    data = response.json()
    return data.get("articles", [])

# Process the given topic by fetching the relevant articles. Only add the unseen articles
def process_topic(topic, seen_articles):
    """Fetch articles for one topic and return only new (unseen) ones.
    
    Each new article is enriched with metadata from our config —
    the category and tags
    """
    articles = fetch_articles(topic["query"])
    seen_set = set({article["id"] for article in seen_articles})
    new_articles = []

    print("Articles fetched: ", len(articles))
    print("Articles: ", articles)

    for article in articles:
        article_hash = hash_article(article)
        if article_hash not in seen_set:
            seen_set.add(article_hash)
            article["id"] = article_hash
            new_articles.append(article)

    return new_articles

def main():
    seen_articles = load_seen(ARTICLE_FILE)
    for topic in TOPICS:
        new_articles = process_topic(topic, seen_articles)
    save_seen(ARTICLE_FILE, seen_articles + new_articles)

if __name__ == "__main__":
    main()
