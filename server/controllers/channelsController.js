const pool = require("../db");

const Roles = {
    member: 0,
    mod: 1,
    owner: 2,
};

const joinChannel = async (user_id, channel_id, role) => {
    try {
        const response = await pool.query(
            "INSERT INTO user_channel (user_id, channel_id, user_role) VALUES ($1,$2,$3)",
            [user_id, channel_id, role]
        );
    } catch (err) {
        console.log(err.message);
    }
};

const leaveChannel = async (user_id, channel_id) => {
    try {
        const response = await pool.query(
            "DELETE FROM user_channel WHERE user_id = $1 AND channel_id = $2",
            [user_id, channel_id]
        );
    } catch (err) {
        console.log(err.message);
    }
};

const addChannelMember = async (req, res) => {
    try {
        const user_id = await pool.query(
            "SELECT user_id FROM users WHERE username = $1",
            [req.username]
        );
        const channel_id = await pool.query(
            "SELECT channel_id FROM channels WHERE channel_name = $1",
            [req.params.channel_name]
        );

        joinChannel(
            user_id.rows[0].user_id,
            channel_id.rows[0].channel_id,
            Roles.member
        );

        res.json("member");
    } catch (err) {
        console.log(err);
    }
};

const removeChannelMember = async (req, res) => {
    try {
        const user_id = await pool.query(
            "SELECT user_id FROM users WHERE username = $1",
            [req.username]
        );
        const channel_id = await pool.query(
            "SELECT channel_id FROM channels WHERE channel_name = $1",
            [req.params.channel_name]
        );

        const response = await pool.query(
            "SELECT * FROM user_channel WHERE user_id = $1 AND channel_id = $2",
            [user_id.rows[0].user_id, channel_id.rows[0].channel_id]
        );

        if (response.rows[0].user_role === Roles.owner) {
            res.sendStatus(409);
        } else {
            leaveChannel(
                user_id.rows[0].user_id,
                channel_id.rows[0].channel_id,
                Roles.member
            );

            res.sendStatus(209);
        }
    } catch (err) {
        console.log(err);
    }
};

const getChannelRole = async (req, res) => {
    try {
        const user_id = await pool.query(
            "SELECT user_id FROM users WHERE username = $1",
            [req.username]
        );

        const channel_id = await pool.query(
            "SELECT channel_id FROM channels WHERE channel_name = $1",
            [req.params.channel_name]
        );

        const response = await pool.query(
            "SELECT * FROM user_channel WHERE user_id = $1 AND channel_id = $2",
            [user_id.rows[0].user_id, channel_id.rows[0].channel_id]
        );
        if (response.rowCount > 0) {
            let role;
            switch (response.rows[0].user_role) {
                case 0:
                    role = "member";
                    break;
                case 1:
                    role = "mod";
                    break;
                case 2:
                    role = "owner";
                    break;
            }

            res.json(role);
        } else {
            res.sendStatus(400);
        }
    } catch (err) {
        console.error(err.message);
    }
};

const createChannel = async (req, res) => {
    try {
        const { channel_name } = req.body;

        const response = await pool.query(
            "SELECT * FROM channels WHERE channel_name = $1",
            [channel_name.toLowerCase()]
        );

        if (response.rowCount > 0) {
            res.sendStatus(409);
        } else {
            const newChannel = await pool.query(
                "INSERT INTO channels (channel_name) VALUES ($1) RETURNING channel_id",
                [channel_name.toLowerCase()]
            );

            // SET CHANNEL OWNER
            const user_id = await pool.query(
                "SELECT user_id FROM users WHERE username = $1",
                [req.username]
            );

            joinChannel(
                user_id.rows[0].user_id,
                newChannel.rows[0].channel_id,
                Roles.owner
            );

            res.json(newChannel.rows[0]);
        }
    } catch (err) {
        console.error(err.message);
    }
};

const getAllChannels = async (req, res) => {
    try {
        const channels = await pool.query("SELECT * FROM channels");
        res.json(channels.rows);
    } catch (err) {}
};

module.exports = {
    createChannel,
    getChannelRole,
    addChannelMember,
    removeChannelMember,
    getAllChannels,
};
