CREATE DATABASE forumapp

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    username VARCHAR(255),
    password_hash VARCHAR(512),
    refresh_token VARCHAR(512),
    join_date TIMESTAMP
);

CREATE TABLE channels(
    channel_id SERIAL PRIMARY KEY,
    channel_name VARCHAR(255)
);

CREATE TABLE posts(
    post_id SERIAL PRIMARY KEY,
    channel_id INT NOT NULL,
    user_id INT NOT NULL,
    image_link VARCHAR(512),
    link VARCHAR(512),
    self_text TEXT,
    title VARCHAR(255) NOT NULL,
    karma INT,
    post_date TIMESTAMP,
    FOREIGN KEY(channel_id) REFERENCES channels(channel_id),
    FOREIGN KEY(user_id) REFERENCES users(user_id)
);

