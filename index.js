const PORT = process.env.PORT || 3000
const app = express()
import process from 'process'
import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import mysql from 'mysql'

import log from './utils/log.js'
import * as utilities from './utils/utilities.js'
import * as activity from './utils/activity.js'
import * as entity from './utils/entity.js'
import * as address from './utils/address.js'
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
	var listAll = utilities.getNumber(req.query.id_all)
	if (listAll === -1) {
		listAll = 0
	}
	entity.getAllEntities(db, listAll).then(response => {
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

app.get('/api/getEntityByHash', (req, res) => {
	entity.getEntityByID(db, req.query.id_entity).then(response => {
		return res.send(response)
	})
})

app.post('/api/isEntityRegistred', (req, res) => {
	//log(req.body)
	entity.isEntityRegistred(db,req).then(response => {
		res.send(response)
	})
})

app.post('/api/existNick', (req, res) => {
	//log(req.body)
	entity.existNick(db,req).then(response => {
		res.send(response)
	})
})

app.post('/api/createNewEntity', (req, res) => {
	//log(req.body)
	entity.createNewEntity(db,req).then(response => {
		res.send(response)
	})
})

app.put('/api/updateEntity', (req, res) => {
	entity.updateEntity(db,req).then(response => {
		res.send(response)
	})
})

app.delete('/api/deleteEntityById', (req, res) => {
	if (utilities.getNumber(req.query.id_entity) == -1) {
		return res.send('El id no tiene un formato correcto')
	}
	entity.createNewEntity(db, req.query.id_entity).then(response => {
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

app.get('/api/getLocationWithActivities', (req, res) => {
	activity.getLocationWithActivities(db).then(response => {
		res.send(response)
	})
})

app.get('/api/getEntitiesWithActivities', (req, res) => {
	activity.getEntitiesWithActivities(db).then(response => {
		res.send(response)
	})
})

app.post('/api/filterActivitiesBy', (req, res) => {
	//log(req.body)
	activity.filterActivitiesBy(db,req).then(response => {
		res.send(response)
	})
})

app.post('/api/createNewActivity', (req, res) => {
	activity.createNewActivity(db,req).then(response => {
		res.send(JSON.stringify(response))
	})
})

app.post('/api/updateActivity', (req, res) => {
	activity.updateActivity(db,req).then(response => {
		res.send(response)
	})
})

app.post('/api/deleteActivityById', (req, res) => {
	if (utilities.getNumber(req.body.id_activity) == -1) {
		return res.send('El id no tiene un formato correcto')
	}
	activity.deleteActivityById(db, req.body.id_activity).then(response => {
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

app.post('/api/createNewAddress', (req, res) => {
	address.createNewAddress(db,req).then(response => {
		res.send(response)
	})
})

app.put('/api/updateAddress', (req, res) => {
	entity.updateAddress(db,req).then(response => {
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
//  START LISTENING
//
//  //  //  //  //

app.listen(PORT, () => {
	log('\nServer is up and running at port ' + PORT)
})
