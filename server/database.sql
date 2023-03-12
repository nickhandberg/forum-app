CREATE DATABASE forumapp

CREATE TABLE post(
    post_id SERIAL PRIMARY KEY,
    image_link VARCHAR(512),
    link VARCHAR(512),
    self_text TEXT,
    title VARCHAR(255),
    channel_name VARCHAR(32),
    karma INT,
    post_date TIMESTAMP
);