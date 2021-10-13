import process from 'process'
import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
const app = express()
import cors from 'cors'
import mysql from 'mysql'
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

const log = (msg) => {
	process.env.NODE_ENV && console.log(msg)
}

//  //  //  //  //
//
//  DB CONNECTION
//
//  //  //  //  //

const db_config = {
	user: process.env.NODE_ENV === 'dev' ? process.env.REACT_APP_DB_USER_DEV : process.env.REACT_APP_DB_USER_PRODUCTION,
	host: process.env.NODE_ENV === 'dev' ? process.env.REACT_APP_DB_HOST_DEV : process.env.REACT_APP_DB_HOST_PRODUCTION,
	password: process.env.NODE_ENV === 'dev' ? process.env.REACT_APP_DB_PASSWORD_DEV : process.env.REACT_APP_DB_PASSWORD_PRODUCTION,
	database: process.env.NODE_ENV === 'dev' ? process.env.REACT_APP_DB_NAME_DEV : process.env.REACT_APP_DB_NAME_PRODUCTION,
	connectionLimit : 100,
	acquireTimeout: 300
}

const db = mysql.createPool(db_config)

db.getConnection((err, connection) => {

	if (err) {
		if (err.code == 'PROTOCOL_CONNECTION_LOST') {
			log('👋🏻 DB Connection was closed')
		}

		if (err.code == 'ERR_CON_COUNT_ERROR') {
			log('⚠️ DB has too many connections')
		}
		
		if (err.code == 'ECONNREFUSED') {
			log('⛔️ DB Connection was refused')
		}
	}   

	if (connection) {
		connection.release()
	}
	log('✅ Connected to DB')
	return
})

//  //  //  //  //
//
//  API REST
//
//  //  //  //  //

app.get('/', (req, res) => {
	res.send('✅ Wanna Hang Out server is online')
})

app.get('/env', (req, res) => {
	res.send(process.env.NODE_ENV === 'dev' ? 'dev' : 'prod')
})

app.get('/api/getAllEntities', (req, res) => {
	db.query('SELECT * FROM entity', (err, result) => {
		if (err) {
			console.log(err)
		}
		res.send(result)
	})
})

// LISTEN PORT

app.listen(PORT, () => {
	log('\nServer is up and running at port ' + PORT)
})