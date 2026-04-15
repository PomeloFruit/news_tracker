CREATE TABLE articles (
    id TEXT PRIMARY KEY,
    source TEXT,
    author TEXT,
    title TEXT,
    description TEXT,
    url TEXT,
    published_at TEXT,
    content TEXT,
    url_to_image TEXT,
    query TEXT,
    category TEXT,
    tags TEXT[],
    fetched_at TEXT
);