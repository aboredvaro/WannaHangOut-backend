import log from './log.js'
import * as utilities from './utilities.js'
import * as query from './query.js'
import * as tag from './tag.js'

/**
 * @description Registra una nueva Review en la BD
 * @param {*} db 
 * @param {*} req 
 * @returns Devuelve -1 en caso de error o el id_review de la review creada
 */
 export async function createNewReview(db, req) {
	var id_activity = utilities.getNumber(req.body.id_activity)
	var id_entity = utilities.getNumber(req.body.id_entity)
	var points = utilities.getNumber(req.body.points)

	if (id_activity === -1){
		return 'Formato incorrecto de: "id_activity".'
	} else if (id_entity === -1) {
		return 'Formato incorrecto de: "id_entity".'
	}else if (points === -1) {
		return 'Formato incorrecto de: "Puntos".'
	} else if (utilities.isEmpty(req.body.title)) {
		return 'Formato incorrecto de: "Título de la review".'
	} else if (utilities.isEmpty(req.body.description)) {
		return 'Formato incorrecto de: "Descripción de la review".'
	} else if (utilities.isEmpty(req.body.img_review)) {
		return 'Formato incorrecto de: "Imágenes asociadas".'
	}

	// insertar la review
	var sql = 'INSERT INTO review ('
	sql += 'id_activity, id_entity, title, description, points) VALUES ('
	sql += id_activity + ', '
	sql += id_entity + ', '
	sql += '"' + req.body.title + '", '
	sql += '"' + req.body.description + '", '
	sql += points 
	sql += '); '

	log(sql)
	var idReviewCreate = new Promise(resolve => {
		db.query(sql, (err, result) => {
			if (err) {
				console.log(err)
				resolve(JSON.stringify(-1))
			}
			resolve(JSON.stringify(result.insertId))
		})
	})

	if (idReviewCreate ===-1){
		return -1
	}

	if(query.queryInsertManyPhotos(db, await idReviewCreate, 'img_review', 'id_review', req.body.img_review.split(','))){
		return 'Error: NO se ha podido insertar las imágenes'
	}
	
	return idReviewCreate
}

/**
 * @description Actualiza los datos de una review
 * @param {*} db 
 * @param {*} req 
 * @returns Devuelve false en caso de error true en caso contrario
 */
export async function updateReview(db, req) {
	var id_review = utilities.getNumber(req.body.id_review)
	var id_activity = utilities.getNumber(req.body.id_activity)
	var points = utilities.getNumber(req.body.points)

	if (id_review === -1){
		return 'Formato incorrecto de: "id_review".'
	} else if (id_activity === -1){
		return 'Formato incorrecto de: "id_activity".'
	} else if (points === -1) {
		return 'Formato incorrecto de: "Puntos".'
	} else if (utilities.isEmpty(req.body.title)) {
		return 'Formato incorrecto de: "Título del Evento".'
	} else if (utilities.isEmpty(req.body.description)) {
		return 'Formato incorrecto de: "Descripción del Evento".'
	}
	
	if (!utilities.isEmpty(req.body.img_review)) {
		if (!query.deleteSimpleFromTable(db, id_review, 'img_review', 'id_review')) {
			return 'Error: NO se ha podido eliminar imagenes'
		}
		let arr = []
		for(let i of req.body.img_review) {
			arr.push(parseInt(i))
		}
		if (!query.ueryInsertManyPhotos(db, id_review, arr, 'img_review', 'id_review', 'id_image')) {
			return 'Error: NO se ha podido insertar Etiquetas'
		}
	}

	var sql = 'UPDATE review SET '
	sql += 'id_activity = ' + id_activity + ', '
	sql += 'title = "' + req.body.title + '", '
	sql += 'description = "' + req.body.description + '", '
	sql += 'points = ' + points + ' '
	sql += 'WHERE id_review = ' + id_review + '; '
	log(sql)
	return new Promise(resolve => {
		db.query(sql, (err) => {
			if (err) {
				console.log(err)
				resolve(false)
			}
			resolve(true)
		})
	})
}

/**
 * @description Devuelve todas las review asignadas a un id_activity
 * @param {*} db Base de Datos de consulta
 * @param {*} activityID id a consultar
 * @returns JSON con los siguientes datos {"id_review", "id_activity", "title", 
 * 			"description", "points"}
 */
export async function getAllReviewByActivityID(db, activityID) {
	if ((await query.getMaxIdFromTable(db, 'activity')) < activityID || activityID < 1) {
		return 'id fuera de rango'
	}
	return new Promise(resolve => {
		db.query(sqlBodyQueryGetReview() + 'WHERE deleted = 0 and id_activity = ' + activityID, (err, result) => {
			if (err) {
				console.log(err)
			}
			resolve(result)
		})
	})
}

/**
 * @description Devuelve una review dado el id_review
 * @param {*} db Base de Datos de consulta
 * @param {*} id_review id a consultar
 * @returns JSON con los siguientes datos {"id_review", "id_activity", "title", 
 * 			"description", "points"}
 */
export async function getReviewByID(db, id_review) {
	if ((await query.getMaxIdFromTable(db, 'review')) < id_review || id_review < 1) {
		return 'id fuera de rango'
	}
	return new Promise(resolve => {
		db.query(sqlBodyQueryGetReview() + 'WHERE id_review = ' + id_review, (err, result) => {
			if (err) {
				console.log(err)
			}
			resolve(result[0])
		})
	})
}

export async function deleteReviewById(db, id_review) {

	var sql = 'UPDATE review SET '
	sql += 'deleted = ' + 1 + ' '
	sql += 'WHERE id_review = ' + id_review + '; '

	return new Promise(resolve => {
		db.query(sql, (err) => {
			if (err) {
				console.log(err)
				resolve(false)
			}
			resolve(true)
		})
	})
}

export async function getAverageScoreByActivities(db, id_activity){
	var sql = 'SELECT COUNT(id_review) as reviews, ROUND(AVG(points),2) as media '
	sql += 'FROM review '
	sql += 'WHERE deleted = 0 AND id_activity = ' + id_activity + '; '
	return new Promise(resolve => {
		db.query(sql, (err, result) => {
			if (err) {
				console.log(err)
			}
			resolve(result)
		})
	})
}

export async function getAverageScoreByEntityCreator(db, id_entity_creator){
	var sql = 'SELECT COUNT(a.id_activity) as reviews, ROUND(AVG(r.points),2) as media '
	sql += 'FROM review r, activity a '
	sql += 'WHERE a.id_activity = r.id_activity AND r.deleted = 0 AND a.deleted = 0 AND a.id_entity_creator = ' + id_entity_creator + '; '
	return new Promise(resolve => {
		db.query(sql, (err, result) => {
			if (err) {
				console.log(err)
			}
			resolve(result)
		})
	})
}

export async function userHasReviewInActivity(db, id_entity, id_activity){
	if (id_entity === -1){
		return 'Formato incorrecto de: "id_entity".'
	} else if (id_activity === -1){
		return 'Formato incorrecto de: "id_activity".'
	}

	var sql = 'SELECT EXISTS(SELECT * FROM review WHERE  '
	sql += 'id_entity = ' + id_entity + ' '
	sql += 'and id_activity = ' + id_activity +') as cond; '
	return new Promise(resolve => {
		db.query(sql, (err, result) => {
			if (err) {
				console.log(err)
			}
			resolve(result[0])
		})
	})
}

//  //  //  //  //  //  //  //  //  //  //  //
//								    //
//  FUNCIONES SECUNDARIAS, PERO NECESARIAS  //
//                                          //
//  //  //  //  //  //  //  //  //  //  //  //

function sqlBodyQueryGetReview(){
	var sqlSelect = 'SELECT * '
	var sqlFrom = 'FROM review '
	return sqlSelect + sqlFrom
}