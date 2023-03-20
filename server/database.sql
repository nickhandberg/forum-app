CREATE DATABASE forumapp;

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

CREATE TABLE user_channel(
    user_id INT,
    channel_id INT,
    user_role INT,
    PRIMARY KEY (user_id, channel_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (channel_id) REFERENCES channels(channel_id)
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

CREATE TABLE comments(
    comment_id SERIAL PRIMARY KEY,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    parent_id INT NOT NULL,
    parent_path VARCHAR(255) NOT NULL,
    comment_text TEXT NOT NULL,
    post_date TIMESTAMP,
    FOREIGN KEY(post_id) REFERENCES posts(post_id),
    FOREIGN KEY(user_id) REFERENCES users(user_id)
);

CREATE INDEX comments_idx ON comments (parent_path, post_date);

