DROP TABLE IF EXISTS todos;
CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY, todo TEXT NOT NULL, is_completed INTEGER NOT NULL DEFAULT 0, created_at DATETIME DEFAULT CURRENT_TIMESTAMP);