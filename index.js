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
import * as image from './utils/image.js'
import * as tag from './utils/tag.js'
import * as registro from './utils/registro.js'
import * as cloudinary from './utils/cloudinary.js'

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
	entity.getEntityByHash(db, req.query.entityHash).then(response => {
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

app.post('/api/deleteEntityById', (req, res) => {
	if (utilities.getNumber(req.body.id_entity) == -1) {
		//log(req.query.id_entity)
		return res.send('El id no tiene un formato correcto')
	}
	entity.deleteEntityById(db, req.body.id_entity).then(response => {
		res.send(response)
	})
})

//  //  //  //  //
//
//  API ACTIVITY
//
//  //  //  //  //

app.get('/api/getAllActivities', (req, res) => {
	activity.getAllActivities(db, req).then(response => {
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

app.get('/api/getImageByIdActivity', (req, res) => {
	if (utilities.getNumber(req.query.id_activity) == -1) {
		return res.send('El id no tiene un formato correcto')
	}
	image.getImagesByIdAndType(db, req.query.id_activity, 1, req.query.cant).then(response => {
		res.send(response)
	})
})

app.get('/api/filterActivitiesBy', (req, res) => {
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

app.post('/api/checkIfUserInActivity', (req, res) => {
	activity.checkIfUserInActivity(db, req.body.id_entity, req.body.id_activity).then(response => {
		res.send(response)
	})
})

app.post('/api/searchActivitiesByKeywords', (req, res) => {
	const arr = req.body
	if (Object.keys(req.body).length === 0 || arr.length === 0) {
		res.send('')
	}
	activity.searchActivitiesByKeywords(db, req.body).then(response => {
		res.send(response)
	})
})

app.get('/api/getActivitiesCreatedByEntity', (req, res) => {
	activity.getActivitiesCreatedByEntity(db, req.query.id_entity).then(response => {
		res.send(response)
	})
})

app.get('/api/getActivitiesUserSignUpTo', (req, res) => {
	activity.getActivitiesUserSignUpTo(db, req.query.id_entity).then(response => {
		res.send(response)
	})
})

/*
app.get('/api/hola', (req, res) => {
	activity.getActivityByID(db, req.query.id_entity).then(response => {
		res.send(response)
	})
})
*/

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

app.get('/api/getAllAddressOfActivities', (req, res) => {
	address.getAllAddressOfActivities(db,).then(response => {
		res.send(response)
	})
})

app.post('/api/createNewAddress', (req, res) => {
	address.createNewAddress(db,req).then(response => {
		res.send(response)
	})
})

app.put('/api/updateAddress', (req, res) => {
	address.updateAddress(db,req).then(response => {
		res.send(response)
	})
})

//  //  //  //  //
//
//  API REVIEW
//
//  //  //  //  //

app.post('/api/createNewReview', (req, res) => {
	//log(req)
	review.createNewReview(db,req).then(response => {
		res.send(response)
	})
})

app.post('/api/updateReview', (req, res) => {
	review.updateReview(db,req).then(response => {
		res.send(response)
	})
})

app.post('/api/deleteReviewById', (req, res) => {
	if (utilities.getNumber(req.body.id_review) == -1) {
		return res.send('El id no tiene un formato correcto')
	}
	review.deleteReviewById(db, req.body.id_review).then(response => {
		res.send(response)
	})
})

app.get('/api/getImageByIdReview', (req, res) => {
	if (utilities.getNumber(req.query.id_review) == -1) {
		return res.send('El id no tiene un formato correcto')
	}
	image.getImagesByIdAndType(db, req.query.id_review, 2, req.query.cant).then(response => {
		res.send(response)
	})
})

app.get('/api/getReviewByID', (req, res) => {
	if (utilities.getNumber(req.query.id_review) == -1) {
		return res.send('El id no tiene un formato correcto')
	}
	review.getReviewByID(db, req.query.id_review).then(response => {
		res.send(response)
	})
})

app.get('/api/getAverageScoreByActivities', (req, res) => {
	if (utilities.getNumber(req.query.id_activity) == -1) {
		return res.send('El id no tiene un formato correcto')
	}
	review.getAverageScoreByActivities(db, req.query.id_activity).then(response => {
		res.send(response)
	})
})

app.get('/api/getAverageScoreByEntityCreator', (req, res) => {
	if (utilities.getNumber(req.query.id_entity_creator) == -1) {
		return res.send('El id no tiene un formato correcto')
	}
	review.getAverageScoreByEntityCreator(db, req.query.id_entity_creator).then(response => {
		res.send(response)
	})
})

app.get('/api/getAllReviewByActivityID', (req, res) => {
	if (utilities.getNumber(req.query.id_activity) == -1) {
		return res.send('El id no tiene un formato correcto')
	}
	review.getAllReviewByActivityID(db, req.query.id_activity).then(response => {
		res.send(response)
	})
})

app.post('/api/userHasReviewInActivity', (req, res) => {
	review.userHasReviewInActivity(db, req.body.id_entity, req.body.id_activity).then(response => {
		res.send(response)
	})
})

//  //  //  //  //
//
//  API IMAGES
//
//  //  //  //  //
app.get('/api/getImagesOfActivity', (req, res) => {
	if (utilities.getNumber(req.query.id_activity) == -1) {
		return res.send('El id no tiene un formato correcto')
	}
	image.getImageByIdAndType(db, req.query.id_activity, 1).then(response => {
		res.send(response)
	})
})

app.get('/api/getImagesOfReview', (req, res) => {
	if (utilities.getNumber(req.query.id_review) == -1) {
		return res.send('El id no tiene un formato correcto')
	}
	image.getImageByIdAndType(db, req.query.id_review, 2).then(response => {
		res.send(response)
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

app.post('/api/getTagsByIdAndType', (req, res) => {
	//log(req.body)
	tag.getTagsByIdAndType(db, req).then(response => {
		res.send(response)
	})
})

//  //  //  //  //
//
//  API REGISTRO DE ENTIDADES EN ACTIVIDADES
//
//  //  //  //  //

app.get('/api/setEntityToActivity', (req, res) => {
	if (utilities.getNumber(req.query.id_entity) == -1) {
		return res.send('El id_entity no tiene un formato correcto')
	}
	if (utilities.getNumber(req.query.id_activity) == -1) {
		return res.send('El id_activity no tiene un formato correcto')
	}
	registro.setEntityToActivity(db, req.query.id_entity).then(response => {
		return res.send(response)
	})
})

app.get('/api/deleteEntityToActivity', (req, res) => {
	if (utilities.getNumber(req.query.id_entity) == -1) {
		return res.send('El id_entity no tiene un formato correcto')
	}
	if (utilities.getNumber(req.query.id_activity) == -1) {
		return res.send('El id_activity no tiene un formato correcto')
	}
	registro.deleteEntityToActivity(db, req.query.id_entity).then(response => {
		return res.send(response)
	})
})

/*
app.get('/api/theCloudinary', (req, res) => {
	const path = ['./img/IMG_9698b.jpg','./img/Captura.JPG','./img/Captura2.JPG']
	cloudinary.putImagesIntoCloudinary(path, 'avatar').then(response => {
		return res.send(response)
	})
})
*/

//  //  //  //  //
//
//  START LISTENINGcloudinary
//
//  //  //  //  //

app.listen(PORT, () => {
	log('\nServer is up and running at port ' + PORT)
})