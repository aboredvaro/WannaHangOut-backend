import process from 'process'
import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
const app = express()
import cors from 'cors'
import mysql from 'mysql'
const PORT = 3000

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

var db
var db_config = {
	user: process.env.NODE_ENV === 'dev' ? process.env.REACT_APP_DB_USER_DEV : process.env.REACT_APP_DB_USER_PRODUCTION,
	host: process.env.NODE_ENV === 'dev' ? process.env.REACT_APP_DB_HOST_DEV : process.env.REACT_APP_DB_HOST_PRODUCTION,
	password: process.env.NODE_ENV === 'dev' ? process.env.REACT_APP_DB_PASSWORD_DEV : process.env.REACT_APP_DB_PASSWORD_PRODUCTION,
	database: process.env.NODE_ENV === 'dev' ? process.env.REACT_APP_DB_NAME_DEV : process.env.REACT_APP_DB_NAME_PRODUCTION
}

function db_connect() {

	db = mysql.createConnection(db_config)

	db.connect(function(err) {
		if(err) {
			setTimeout(db_connect(), 2000)
			throw err
		} else {
			log('✅ Connected to db')
		}
	})

	db.on('error', function(err) {
		if(err.code === 'PROTOCOL_CONNECTION_LOST') {
			log('🚧 Reconnecting to db...')
			db_connect()
		} else {
			throw err
		}
	})

}

db_connect()

//  //  //  //  //
//
//  API REST
//
//  //  //  //  //

app.get('/', (req, res) => {
	res.send('✅ Wanna Hang Out server is online')
})

// Examples

app.get('/api/hello', (req, res) => {
	res.send('Hello world, his is working!')
})

app.get('/api/getAllEntities', (req, res) => {
	db.query('SELECT * FROM entity', (err, result) => {
		if (err) {
			console.log(err)
		}
		res.send(result)
	})
})

// Examples end

app.listen(PORT, () => {
	log('\nServer is up and running at port' + PORT)
})