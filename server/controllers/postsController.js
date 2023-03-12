const pool = require("../db");

const getAllPosts = async (req, res) => {
    try {
        const allPosts = await pool.query("SELECT * FROM post");
        res.json(allPosts.rows);
    } catch (err) {
        console.error(err.message);
    }
};

const getPostsByChannel = async (req, res) => {
    try {
        const { channel_name } = req.params;
        const allPosts = await pool.query(
            "SELECT * FROM post WHERE channel_name = $1",
            [channel_name]
        );
        res.json(allPosts.rows);
    } catch (err) {
        console.error(err.message);
    }
};

const createPost = async (req, res) => {
    try {
        const { image_link, link, self_text, title, channel_name, karma } =
            req.body;
        const newPost = await pool.query(
            "INSERT INTO post (image_link, link, self_text, title, channel_name, karma, post_date) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [
                image_link,
                link,
                self_text,
                title,
                channel_name,
                karma,
                new Date(),
            ]
        );

        res.json(newPost.rows[0]);
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
            "UPDATE post SET self_text = $1 WHERE post_id = $2",
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
        const deletedPost = await pool.query(
            "DELETE FROM post WHERE post_id = $1",
            [id]
        );
        res.json(`Post ${id} was deleted`);
    } catch (err) {
        console.error(err.message);
    }
};

const getPost = async (req, res) => {
    try {
        const post = await pool.query("SELECT * FROM post WHERE post_id = $1", [
            req.params.id,
        ]);
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
};
