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
    // const comments = await pool.query(
    //     `WITH cte_replies AS (
    //         SELECT parent_id,
    //         COALESCE(json_agg(row_to_json(replies)),'[]'::JSON) AS replies
    //     FROM comments AS replies
    //     GROUP BY parent_id
    //     )
    //     SELECT *
    //     FROM
    //         comments c
    //         LEFT JOIN cte_replies ON c.comment_id = cte_replies.parent_id
    //     WHERE
    //         cte_replies.parent_id = c.comment_id`
    // );

    const comments = await pool.query(
        `WITH RECURSIVE comments_cte (user_id, comment_id, path, comment_text) AS (
            SELECT user_id, comment_id, CONCAT('/',comment_id::text), comment_text 
            FROM comments 
            WHERE parent_id IS NULL 
            UNION ALL 
            SELECT r.user_id, r.comment_id, CONCAT(path,'/', r.comment_id), r.comment_text 
            FROM comments r 
            JOIN comments_cte 
            ON comments_cte.comment_id = r.parent_id
        ), author AS (
            SELECT user_id, username
            FROM users
        ) 
        SELECT * FROM comments_cte c LEFT JOIN author a ON a.user_id = c.user_id ORDER BY path`
    );

    res.json(comments.rows);
};

module.exports = {
    getComments,
    createComment,
};
