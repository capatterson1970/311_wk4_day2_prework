const express = require('express');
const app = express();
const mysql = require('mysql');
const port = process.env.PORT || 5000;

let pool = mysql.createPool({
    connectionLimit: 100,
    host: '34.72.186.252',
    user: 'root',
    password: 'BigDaddy#1',
    database: 'admin',
    debug: false
})

const get_users = (req, res) => {
    pool.query('SELECT * FROM users', (err, rows) => {
        if(err) {
            return res.json({
                'error': true,
                'message': 'Error occurred: ' + err
            })
        } else {
            res.json(rows)
        }
    })
}

const get_first_names = (req, res) => {
    let sql = 'SELECT ??, ?? FROM ?? WHERE ?? < ?'
    const replacments = ['id', 'first_name', 'users', 'id', 10]
    sql = mysql.format(sql, replacments)
    pool.query(sql, (err, rows) => {
        if(err) {
            return res.json({
                'error': true,
                'message': 'Error occurred: ' + err
            })
        } else {
            res.json(rows)
        }
    })
}

app.get('/', (req, res) => {
    get_users(req, res)
})

app.get('/first-names', (req, res) => {
    get_first_names(req, res)
})

app.listen(port, () => {
    console.log(`Example port listening on port ${port}`)
});

