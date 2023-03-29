const pool = require("../db");

const createComment = async (req, res) => {
    try {
        let { parent_id, comment_text } = req.body;

        const newComment = await pool.query(
            "INSERT INTO comments (post_id, user_id, parent_id, comment_text, post_date) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [
                req.params.post_id,
                req.user.user_id,
                parent_id,
                comment_text,
                new Date(),
            ]
        );

        res.json(newComment.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
};

const editComment = async (req, res) => {
    try {
        const { comment_id } = req.params;
        const { comment_text } = req.body;
        const updatedComment = pool.query(
            `UPDATE comments SET comment_text = $1 WHERE comment_id = $2`,
            [comment_text, comment_id]
        );
        res.json(`Post ${comment_id} was updated`);
    } catch (err) {
        console.error(err);
    }
};

const deleteComment = async (req, res) => {
    try {
        const { comment_id } = req.params;
        const updatedComment = pool.query(
            `UPDATE comments SET comment_text = $1 WHERE comment_id = $2`,
            ["[deleted]", comment_id]
        );
        res.json(`Post ${comment_id} was deleted`);
    } catch (err) {
        console.error(err);
    }
};

const getComments = async (req, res) => {
    try {
        const comments = await pool.query(
            `WITH RECURSIVE comments_cte (post_id, user_id, comment_id, path, comment_text, post_date) AS (
                SELECT post_id, user_id, comment_id, CONCAT('/',comment_id::text), comment_text, post_date 
                FROM comments 
                WHERE parent_id IS NULL 
                UNION ALL 
                SELECT r.post_id, r.user_id, r.comment_id, CONCAT(path,'/', r.comment_id), r.comment_text, r.post_date 
                FROM comments r 
                JOIN comments_cte 
                ON comments_cte.comment_id = r.parent_id
            )
            SELECT c.*, u.username FROM comments_cte c LEFT JOIN users u ON c.user_id = u.user_id WHERE c.post_id = $1 ORDER BY path`,
            [req.params.post_id]
        );

        res.json(comments.rows);
    } catch (err) {
        console.error(err.message);
    }
};

const getCommentById = async (req, res) => {
    try {
        const comments = await pool.query(
            `WITH RECURSIVE comments_cte (post_id, user_id, comment_id, path, comment_text, post_date) AS (
                SELECT post_id, user_id, comment_id, CONCAT('/',comment_id::text), comment_text, post_date
                FROM comments 
                WHERE comment_id = $1
                UNION ALL 
                SELECT r.post_id, r.user_id, r.comment_id, CONCAT(path,'/', r.comment_id), r.comment_text, r.post_date
                FROM comments r 
                JOIN comments_cte 
                ON comments_cte.comment_id = r.parent_id
            )
            SELECT c.*, u.username FROM comments_cte c LEFT JOIN users u ON c.user_id = u.user_id ORDER BY path`,
            [req.params.comment_id]
        );

        res.json(comments.rows);
    } catch (err) {
        console.error(err.message);
    }
};

module.exports = {
    getComments,
    createComment,
    getCommentById,
    editComment,
    deleteComment,
};
