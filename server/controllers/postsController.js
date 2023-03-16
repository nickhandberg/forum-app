const pool = require("../db");
const lpg = require("link-preview-generator");

const getPreviewData = async (link) => {
    const previewData = await lpg(link);
    return previewData;
};

const getAllPosts = async (req, res) => {
    try {
        const allPosts = await pool.query(
            "SELECT p.*, u.username, c.channel_name FROM posts p JOIN users u ON p.user_id = u.user_id JOIN channels c ON p.channel_id = c.channel_id"
        );
        res.json(allPosts.rows);
    } catch (err) {
        console.error(err.message);
    }
};

const getPostsByChannel = async (req, res) => {
    try {
        const { channel_name } = req.params;
        const channel_id = await pool.query(
            "SELECT * FROM channels WHERE channel_name = $1",
            [channel_name]
        );
        const allPosts = await pool.query(
            "SELECT p.*, u.username, c.channel_name FROM posts p JOIN users u ON p.user_id = u.user_id JOIN channels c ON p.channel_id = c.channel_id WHERE p.channel_id = $1",
            [channel_id.rows[0].channel_id]
        );
        res.json(allPosts.rows);
    } catch (err) {
        console.error(err.message);
    }
};

const getPostsByUser = async (req, res) => {
    try {
        const user_id = await pool.query(
            "SELECT * FROM users WHERE username = $1",
            [req.params.username]
        );
        const allPosts = await pool.query(
            "SELECT p.*, u.username, c.channel_name FROM posts p JOIN users u ON p.user_id = u.user_id JOIN channels c ON p.channel_id = c.channel_id WHERE u.user_id = $1",
            [user_id.rows[0].user_id]
        );
        res.json(allPosts.rows);
    } catch (err) {
        console.error(err.message);
    }
};

const createPost = async (req, res) => {
    try {
        const { channel_name, image_link, link, self_text, title } = req.body;

        const channel_id = await pool.query(
            "SELECT channel_id FROM channels WHERE channel_name = $1",
            [channel_name]
        );

        const user_id = await pool.query(
            "SELECT user_id FROM users WHERE username = $1",
            [req.username]
        );
        const newPost = await pool.query(
            "INSERT INTO posts (channel_id, user_id, image_link, link, self_text, karma, title, post_date) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING post_id",
            [
                channel_id.rows[0].channel_id,
                user_id.rows[0].user_id,
                image_link,
                link,
                self_text,
                0,
                title,
                new Date(),
            ]
        );

        res.json(newPost.rows[0]);

        if (link) {
            const previewData = await getPreviewData(link);
            const updateImage = await pool.query(
                "UPDATE posts SET image_link = $1 WHERE post_id = $2",
                [previewData.img, newPost.rows[0].post_id]
            );
        }
    } catch (err) {
        console.error(err.message);
    }
};

const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        // user can only update self text content
        const { self_text } = req.body;
        const updatedPost = await pool.query(
            "UPDATE posts SET self_text = $1 WHERE post_id = $2",
            [self_text, id]
        );
        res.json(`Post ${id} was updated`);
    } catch (err) {
        console.error(err.message);
    }
};

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        const user_id = await pool.query(
            "SELECT user_id FROM users WHERE username = $1",
            [req.username]
        );

        const deletedPost = await pool.query(
            "DELETE FROM posts WHERE post_id = $1 AND user_id = $2",
            [id, user_id.rows[0].user_id]
        );
        res.json(`Post ${id} was deleted`);
    } catch (err) {
        console.error(err.message);
    }
};

const getPost = async (req, res) => {
    try {
        const post = await pool.query(
            "SELECT p.*, u.username, c.channel_name FROM posts p JOIN users u ON p.user_id = u.user_id JOIN channels c ON p.channel_id = c.channel_id WHERE p.post_id = $1",
            [req.params.id]
        );
        res.json(post.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
};

module.exports = {
    getAllPosts,
    getPostsByChannel,
    createPost,
    updatePost,
    deletePost,
    getPost,
    getPostsByUser,
};
