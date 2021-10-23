const PORT = process.env.PORT || 3000
const app = express()
import process from 'process'
import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import mysql from 'mysql'

import * as utilities from './utils/utilities.js'

import * as activity from './utils/activity.js'
import * as entity from './utils/entity.js'
import * as address from './utils/address.js'
import log from './utils/log.js'
import * as review from './utils/review.js'
import * as tag from './utils/tag.js'

app.use(cors())
app.use(express.json())

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

// SERVER STATUS DEBUG
app.get('/', (req, res) => {
	res.send('✅ Wanna Hang Out server is online')
})

// ENV DEBUG API
app.get('/env', (req, res) => {
	res.send(process.env.NODE_ENV === 'dev' ? 'dev' : 'prod')
})

//  //  //  //  //
//
//  API ENTITY
//
//  //  //  //  //

app.get('/api/getAllEntities', (req, res) => {
	entity.getAllEntities(db).then(response => {
		res.send(response)
	})
})

app.get('/api/getEntityByID', (req, res) => {
	if (utilities.getNumber(req.query.id_entity) == -1) {
		return res.send('El id no tiene un formato correcto')
	}
	entity.getEntityByID(db, req.query.id_entity).then(response => {
		return res.send(response)
	})
})

//  //  //  //  //
//
//  API TAGS
//
//  //  //  //  //

app.get('/api/getAllTags', (req, res) => {
	tag.getAllTags(db).then(response => {
		res.send(response)
	})
})

//  //  //  //  //
//
//  API ACTIVITY
//
//  //  //  //  //

app.get('/api/getAllActivities', (req, res) => {
	var listAll = utilities.getNumber(req.query.id_all)
	if (listAll === -1) {
		listAll = 0
	}

	log(listAll)
	activity.getAllActivities(db, listAll).then(response => {
		res.send(response)
	})
})

app.get('/api/getActivityByID', (req, res) => {
	if (utilities.getNumber(req.query.id_activity) == -1) {
		return res.send('El id no tiene un formato correcto')
	}
	activity.getActivityByID(db, req.query.id_activity).then(response => {
		return res.send(response)
	})
})

app.get('/api/getTagsOfActivityByID', (req, res) => {
	if (utilities.getNumber(req.query.id_activity) == -1) {
		return res.send('El id no tiene un formato correcto')
	}
	activity.getTagsOfActivityByID(db, req.query.id_activity).then(response => {
		return res.send(response)
	})
})

app.get('/api/filterActivitiesBy', (req, res) => {
	activity.filterActivitiesBy(db,req).then(response => {
		res.send(response)
	})
})

app.post('/api/createNewActivity', (req, res) => {
	activity.createNewActivity(db,req).then(response => {
		res.send(response)
	})
})

//  //  //  //  //
//
//  API ADDRESS
//
//  //  //  //  //

app.get('/api/getAddressByID', (req, res) => {
	if (utilities.getNumber(req.query.id_address) == -1) {
		return res.send('El id no tiene un formato correcto')
	}
	address.getAddressByID(db,req.query.id_address).then(response => {
		res.send(response)
	})
})

//  //  //  //  //
//
//  API REVIEW
//
//  //  //  //  //

// To implement

//  //  //  //  //
//
//  START LISTENING
//
//  //  //  //  //

app.listen(PORT, () => {
	log('\nServer is up and running at port ' + PORT)
})
