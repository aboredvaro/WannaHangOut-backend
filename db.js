/* eslint-disable no-undef */
import mysql from 'mysql'

const db = mysql.createConnection({
	user: 'b3390b4687efaf',
	host: 'eu-cdbr-west-01.cleardb.com',
	password: 'ed3526bc',
	database: 'heroku_8710917fecf1cf0',
})

module.exports = db