const pool = require("../db");
const { linkPreview } = require("link-preview-node");

const getPreviewData = async (link, post_id) => {
    await linkPreview(link)
        .then(async (resp) => {
            const updateImage = await pool.query(
                "UPDATE posts SET image_link = $1 WHERE post_id = $2",
                [resp.image, post_id]
            );
        })
        .catch((catchErr) => {
            console.log(catchErr);
        });
};

const getAllPosts = async (req, res) => {
    try {
        const { type, value } = req.query;

        let params = [];

        let wildcard = 0;
        const channelQuery = `WHERE p.channel_id = $1`;
        const userQuery = `WHERE u.user_id = $1`;

        if (type === "channel") {
            const channel_id = await pool.query(
                "SELECT * FROM channels WHERE channel_name = $1",
                [value]
            );
            wildcard = channel_id.rows[0].channel_id;
            params.push(channel_id.rows[0].channel_id);
        }
        if (type === "user") {
            const user_id = await pool.query(
                "SELECT * FROM users WHERE username = $1",
                [value]
            );
            wildcard = user_id.rows[0].user_id;
            params.push(user_id.rows[0].user_id);
        }
        const voteQuerys = [
            `, user_votes AS (
                                SELECT post_id, user_id, vote
                                FROM voted_posts
                                WHERE user_id = ${
                                    params.length > 0 ? "$2" : "$1"
                                }
                            )`,
            `LEFT JOIN user_votes uv ON uv.post_id = p.post_id`,
        ];
        if (req.user) {
            params.push(req.user.user_id);
        }

        const allPosts = await pool.query(
            `WITH post_comments AS (
                SELECT post_id, COUNT(post_id) AS comment_cnt
                FROM comments
                GROUP BY post_id
            ), post_votes AS (
                SELECT post_id, SUM(vote) AS karma
                FROM voted_posts
                GROUP BY post_id
            )${req.user ? voteQuerys[0] : ""}
            SELECT p.*, u.username, c.channel_name, comment_cnt, ${
                req.user ? "vote," : ""
            } COALESCE(karma, 0) AS karma
            FROM posts p 
            JOIN users u ON p.user_id = u.user_id 
            JOIN channels c ON p.channel_id = c.channel_id
            LEFT JOIN post_comments pc ON pc.post_id = p.post_id
            LEFT JOIN post_votes pv ON pv.post_id = p.post_id
            ${req.user ? voteQuerys[1] : ""}
            ${
                type === "channel"
                    ? channelQuery
                    : type === "user"
                    ? userQuery
                    : ""
            }
            ORDER BY karma DESC
            `,
            params
        );
        res.json(allPosts.rows);
    } catch (err) {
        console.error(err.message);
    }
};

const getPost = async (req, res) => {
    try {
        let params = [req.params.id];

        const voteQuerys = [
            `, user_votes AS (
                                SELECT post_id, user_id, vote
                                FROM voted_posts
                                WHERE user_id = ${
                                    params.length > 0 ? "$2" : "$1"
                                }
                            )`,
            `LEFT JOIN user_votes uv ON uv.post_id = p.post_id`,
        ];
        if (req.user) {
            params.push(req.user.user_id);
        }

        const post = await pool.query(
            `WITH post_comments AS (
                SELECT post_id, COUNT(post_id) AS comment_cnt
                FROM comments
                WHERE post_id = $1
                GROUP BY post_id
                
            ), post_votes AS (
                SELECT post_id, SUM(vote) AS karma
                FROM voted_posts
                GROUP BY post_id
            )${req.user ? voteQuerys[0] : ""}
            SELECT p.*, u.username, c.channel_name, pc.comment_cnt,  ${
                req.user ? "vote," : ""
            } COALESCE(karma, 0) AS karma
            FROM posts p 
            JOIN users u ON p.user_id = u.user_id 
            JOIN channels c ON p.channel_id = c.channel_id
            LEFT JOIN post_comments pc ON p.post_id = pc.post_id
            LEFT JOIN post_votes pv ON pv.post_id = p.post_id
            ${req.user ? voteQuerys[1] : ""}
            WHERE p.post_id = $1`,
            params
        );
        res.json(post.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
};

const createPost = async (req, res) => {
    try {
        let { channel_name, image_link, link, self_text, title } = req.body;

        // Preventing a post with more than one type
        if ((image_link && link) || (image_link && self_text)) {
            self_text = link = "";
        }
        if (link && self_text) {
            link = "";
        }

        const channel_id = await pool.query(
            "SELECT channel_id FROM channels WHERE channel_name = $1",
            [channel_name]
        );

        if (channel_id.rowCount > 0) {
            const newPost = await pool.query(
                "INSERT INTO posts (channel_id, user_id, image_link, link, self_text, title, post_date) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING post_id",
                [
                    channel_id.rows[0].channel_id,
                    req.user.user_id,
                    image_link,
                    link,
                    self_text,
                    title,
                    new Date(),
                ]
            );
            if (link) {
                await getPreviewData(link, newPost.rows[0].post_id);
            }

            res.json(newPost.rows[0]);
        } else {
            res.sendStatus(404);
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

        const deletedPost = await pool.query(
            "DELETE FROM posts WHERE post_id = $1 AND user_id = $2",
            [id, req.user.user_id]
        );
        res.json(`Post ${id} was deleted`);
    } catch (err) {
        console.error(err.message);
    }
};

const handleVote = async (req, res) => {
    try {
        const { vote } = req.body;

        if (vote > 1 || vote < -1) {
            res.sendStatus(400);
        }
        const { id } = req.params;

        const user_id = await pool.query(
            "SELECT user_id FROM users WHERE username = $1",
            [req.username]
        );
        const updatedVote = await pool.query(
            `UPDATE voted_posts SET vote = $3 WHERE user_id = $1 AND post_id = $2`,
            [user_id.rows[0].user_id, id, vote]
        );
        if (!updatedVote.rowCount > 0) {
            const votedPost = await pool.query(
                `INSERT INTO voted_posts (user_id, post_id, vote) VALUES ($1, $2, $3) RETURNING *`,
                [user_id.rows[0].user_id, id, vote]
            );
        }

        res.json(`Post ${id} was voted on`);
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    getAllPosts,
    createPost,
    updatePost,
    deletePost,
    getPost,
    handleVote,
};
