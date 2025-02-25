const mysql = require("mysql2");

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_form',
}).promise();

/* async function result() {
    const query = await pool.query('SELECT * FROM form');
    console.log(query);
}
result(); */

module.exports = pool;