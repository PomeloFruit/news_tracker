import os
import json
import psycopg
from kafka import KafkaConsumer
from dotenv import load_dotenv

load_dotenv()

def main():
    consumer = KafkaConsumer(
        "news-articles",
        bootstrap_servers="localhost:9092",
        value_deserializer=lambda v: json.loads(v.decode("utf-8")),
        auto_offset_reset="earliest",
        group_id="dev-news-articles-consumer-group-2"
    )

    db_conn = psycopg.connect(os.environ["DATABASE_URL"])
    db_cursor = db_conn.cursor()

    for message in consumer:
        article = message.value
        print(f"Processing ID: {article['id']} Title: {article['title']}")
        db_cursor.execute(
            """
            INSERT INTO articles (id, source, author, title, description, url, published_at, content, url_to_image, query, category, tags, fetched_at)
            VALUES (%(id)s, %(source)s, %(author)s, %(title)s, %(description)s, %(url)s, %(published_at)s, %(content)s, %(urlToImage)s, %(query)s, %(category)s, %(tags)s, %(fetched_at)s)
            ON CONFLICT (id) DO NOTHING
            """, 
            article
        )
        db_conn.commit()
    db_cursor.close()
    db_conn.close()

if __name__ == "__main__":
    main()