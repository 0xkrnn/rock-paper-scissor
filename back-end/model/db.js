const Pool = require("pg").Pool
require("dotenv").config()

const pool = new Pool({
    user: process.env.PG_USER,
    password: process.env.PG_PWD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DB,
    ssl: {
        rejectUnauthorized: false 
    }
});

(async () => {
    const client = await pool.connect();
    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS players (
                pid SERIAL PRIMARY KEY,
                player_name VARCHAR(50) NOT NULL,
                match_played INT DEFAULT 0,
                won INT DEFAULT 0,
                lose INT DEFAULT 0
            )
        `);
        console.log('Table created successfully');
    } catch (err) {
        console.error('Error creating table:', err);
    } finally {
        client.release();
    }
})();


module.exports = pool;