import mysql from 'mysql'
import log from './log.js'
import process from 'process'

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

export default db