const pool = require("../db");

const createComment = async (req, res) => {
    try {
        let { post_id, user_id, parent_id, comment_text } = req.body;

        const newComment = await pool.query(
            "INSERT INTO comments (post_id, user_id, parent_id, comment_text, post_date) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [post_id, user_id, parent_id, comment_text, new Date()]
        );

        res.json(newComment.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
};

const getComments = async (req, res) => {
    const comments = await pool.query(
        "SELECT c.*, replies FROM comments c LEFT JOIN (SELECT parent_id, COALESCE(json_agg(row_to_json(replies)), '[]'::JSON) AS replies FROM comments AS replies GROUP BY parent_id) AS replies ON c.comment_id = replies.parent_id WHERE c.parent_id IS NULL"
    );

    res.json(comments.rows);
};

module.exports = {
    getComments,
    createComment,
};
