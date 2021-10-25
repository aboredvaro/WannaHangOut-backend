import log from './log.js'
import * as utilities from './utilities.js'
import * as query from './query.js'
import * as address from './address.js'
import * as tag from './tag.js'

/**
 * @description Registra una nueva Actividad en la BD
 * @param {*} db 
 * @param {*} req 
 * @returns Devuelve -1 en caso de error o el id_Activity de la Actividad creada
 */
export async function createNewActivity(db, req) {
	var id_entity_creator = utilities.getNumber(req.query.id_entity_creator)
	var seats = utilities.getNumber(req.query.seats)
	var price = utilities.getNumber(req.query.price)
	var min_duration = utilities.getNumber(req.query.min_duration)

	if (min_duration === -1){
		return 'Formato incorrecto de: "Duración del Evento".'
	} else if (price === -1) {
		return 'Formato incorrecto de: "Precio".'
	} else if (seats === -1) {
		return 'Formato incorrecto de: "Número de plazas".'
	} else if (id_entity_creator === -1) {
		return 'Formato incorrecto de: "Id del Organizador".'
	} else if (utilities.isEmpty(req.query.title)) {
		return 'Formato incorrecto de: "Título del Evento".'
	} else if (utilities.isEmpty(req.query.description)) {
		return 'Formato incorrecto de: "Descripción del Evento".'
	} else if (utilities.isEmpty(req.query.dateAct)) {
		return 'Formato incorrecto de: "Fecha del Evento".'
	} else if (utilities.isEmpty(req.query.tags_act)) {
		return 'Formato incorrecto de: "Etiquetas identificadoras".'
	}
	
	var id_address = await address.createNewAddress(db, req)
	if (id_address === -1){
		return 'Error: NO se ha podido insertar Dirección'
	}

	// insertar la actividad
	var sql = 'INSERT INTO activity ('
	sql += 'id_entity_creator, id_address, title, description, seats, price, dateAct, min_duration, deleted) VALUES ('
	sql += id_entity_creator + ', '
	sql += id_address + ', '
	sql += '"' + req.query.title + '", '
	sql += '"' + req.query.description + '", '
	sql += seats + ', '
	sql += price + ', '
	sql += '"' + req.query.dateAct + '", '
	sql += min_duration + ', '
	sql += 0
	sql += '); '

	var idActivityCreate = new Promise(resolve => {
		db.query(sql, (err, result) => {
			if (err) {
				console.log(err)
			}
			resolve(JSON.stringify(result.insertId))
		})
	})

	if (idActivityCreate ===-1){
		return -1
	} 

	if (!query.queryOneToMuch(db, await idActivityCreate, req.query.tags_act.split(','), 'tags_act', 'id_activity', 'id_tags')) {
		return 'Error: NO se ha podido insertar Etiquetas'
	}
	
	return idActivityCreate
}

/**
 * @description Actualiza los datos de una Actividad
 * @param {*} db 
 * @param {*} req 
 * @returns Devuelve false en caso de error true en caso contrario
 */
export async function updateActivity(db, req) {
	var id_activity = utilities.getNumber(req.query.id_activity)
	var id_entity_creator = utilities.getNumber(req.query.id_entity_creator)
	var seats = utilities.getNumber(req.query.seats)
	var price = utilities.getNumber(req.query.price)
	var min_duration = utilities.getNumber(req.query.min_duration)
	var deleted = utilities.getNumber(req.query.deleted)

	if (id_activity === -1){
		return 'Formato incorrecto de: "Duración del Evento".'
	} else if (min_duration === -1){
		return 'Formato incorrecto de: "Duración del Evento".'
	} else if (price === -1) {
		return 'Formato incorrecto de: "Precio".'
	} else if (seats === -1) {
		return 'Formato incorrecto de: "Número de plazas".'
	} else if (deleted === -1){
		return 'Formato incorrecto de: "Marcado para borrar".'
	} else if (id_entity_creator === -1) {
		return 'Formato incorrecto de: "Id del Organizador".'
	} else if (utilities.isEmpty(req.query.title)) {
		return 'Formato incorrecto de: "Título del Evento".'
	} else if (utilities.isEmpty(req.query.description)) {
		return 'Formato incorrecto de: "Descripción del Evento".'
	} else if (utilities.isEmpty(req.query.dateAct)) {
		return 'Formato incorrecto de: "Fecha del Evento".'
	} else if (utilities.isEmpty(req.query.tags_act)) {
		return 'Formato incorrecto de: "Etiquetas identificadoras".'
	}

	if (!address.updateAddress(db, req)){
		return 'Error: NO se ha podido actualizar la Dirección'
	}

	if (!tag.deleteTagsByIdOfEntityOrActivity(db, id_activity, 'tags_act', 'id_activity')) {
		return 'Error: NO se ha podido insertar Etiquetas'
	}

	if (!tag.insertTagsByIdOfEntityOrActivity(db, req.query.tags_ent.split(','), id_activity, 'tags_act', 'id_activity')) {
		return 'Error: NO se ha podido insertar Etiquetas'
	}

	var sql = 'UPDATE entity SET '
	sql += 'id_entity_creator = ' + id_entity_creator + ', '
	sql += 'title = "' + req.query.title + '", '
	sql += 'description = "' + req.query.description + '", '
	sql += 'seat = ' + seats + ', '
	sql += 'price = ' + price + ', '
	sql += 'dateAct = "' + req.query.dateAct + '", '
	sql += 'min_duracion = ' + min_duration + ', '
	sql += 'deleted = ' + deleted + ', '
	sql += 'WHERE id_activity = ' + id_activity + '; '

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
 * @description Marca como borrada una entity
 * @param {*} db 
 * @param {*} id_entity 
 * @returns Devuelve false en caso de error true en caso contrario
 */
export async function deleteActivityById(db, id_activity) {

	var sql = 'UPDATE activity SET '
	sql += 'deleted = ' + 1 + ', '
	sql += 'WHERE id_activity = ' + id_activity + '; '

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
 * @description Devuelve un JSON sin filtrar, con todas las Actividades NO BORRADAS
 * @param {*} db
 * @returns JSON
 */
export async function getAllActivities(db, listAll) {
	var sql = sqlBodyQueryGetActivity() + 'WHERE deleted = ' + 0
	if (listAll > 0 ) {
		sql = sqlBodyQueryGetActivity()
	}
	return new Promise(resolve => {
		db.query(sql , (err, result) => {
			if (err) {
				console.log(err)
			}
			resolve(result)
		})
	})
}

/**
 * @description Devuelve una actividad dado el id de dicha actividad
 * @param {*} db Base de Datos de consulta
 * @param {*} activityID id a consultar
 * @returns JSON con los siguientes datos {"id_activity", "title", "description", "seats", 
 * 		  "price", "location", "dateAct", "min_duration", "id_entity_creator"}
 */
export async function getActivityByID(db, activityID) {
	if ((await query.getMaxIdFromTable(db, 'activity')) < activityID || activityID < 1) {
		return 'id fuera de rango'
	}
	return new Promise(resolve => {
		db.query(sqlBodyQueryGetActivity() + 'WHERE id_activity = ' + activityID, (err, result) => {
			if (err) {
				console.log(err)
			}
			resolve(result[0])
		})
	})
}

/**
 * @description Devuelve todas las tags asociadas a una actividad, dado el id de dicha actividad
 * @param {*} db Base de Datos de consulta
 * @param {*} activityID id a consultar
 * @returns JSON con los siguientes datos {"id_tags", "name"}
 */
export async function getTagsOfActivityByID(db, activityID) {
	if ((await query.getMaxIdFromTable(db, 'activity')) < activityID || activityID < 1) {
		return 'id fuera de rango'
	}
	var sqlSelect = 'SELECT t.id_tags, t.name '
	var sqlFrom = 'FROM tags_act ta, tags t '
	var sqlWhere = 'WHERE ta.id_tags = t.id_tags AND ta.id_activity = ' + activityID + ';'
	return new Promise(resolve => {
		db.query(sqlSelect + sqlFrom + sqlWhere, (err, result) => {
			if (err) {
				console.log(err)
			}
			resolve(JSON.stringify(result))
		})
	})
}

/**
 * @description Esta función es genérica, se encarga de aplicar varios filtros, según los criterios 
 * 			 seleccionados de "price", "duration", "date", "seats", "location", "type".
 * 			 La cantidad de "activities" devueltas está comprendida entre [lowerLimit, upperLimit]
 * @param {*} db 
 * @param {*} req 
 * @property Si viene solo 'max', el rango será [0,max)
 * @property Si viene solo 'min', el rango sera [min, maximo de la BD] <--Queda imlementar
 * @property Si viene 'min' y 'max', el rango será [min,max), se supone que min<max
 * @field req.query.location --> String para filtrar por localidad
 * @field req.query.price_min, req.query.price_max --> number para filtrar por precios
 * @field req.query.min_duration_min, req.query.min_duracion_max --> number para filtar por tiempo (minutos) de duración
 * @field req.query.seats_min, req.query.seats_max --> number para filtrar por aforo máximo
 * @field req.query.dateAct_min, req.query.dateAct_max -- date para filtrar por fechas de evento
 * @field req.query.tags --> lista de number para filtrar por etiquetas, deben venir separados por comas y sin espacios ni paréntesis p.e: 1,2,3
 * @field req.query.id_entity_creator --> lista de number para filtrar por creadores de eventos, deben venir separados por comas y sin espacios ni paréntesis p.e: 1,2,3
 * @returns JSON con los siguientes datos {"id_activity", "title", "description", "seats", 
 * 		  "price", "location", "dateAct", "min_duration", "id_entity_creator"}
 */
export async function filterActivitiesBy(db, req) {
	var sqlWhere = 'WHERE a.id_activity '
	sqlWhere += fixFilterByLocation(req.query.location)
	sqlWhere += fixFilterByPrice(req.query.price_min, req.query.price_max)
	sqlWhere += fixFilterByDuration(req.query.min_duration_min, req.query.min_duracion_max)
	sqlWhere += fixFilterBySeats(req.query.seats_min, req.query.seats_max)
	sqlWhere += fixFilterByDate(req.query.dateAct_min, req.query.dateAct_max)
	sqlWhere += fixFilterByType(req.query.id_tags)
	sqlWhere += fixFilterByEntintyCreator(req.query.id_entity_creator)
	var sqlLimit = 'LIMIT ' + fixLowerLimit(req.query.lowerLimit) + ', ' + fixUpperLimit(req.query.upperLimit) + ';'
	
	return new Promise(resolve => {
		db.query(sqlBodyQueryGetActivity() + sqlWhere + sqlLimit, (err, result) => {
			if (err) {
				console.log(err)
			}
			resolve(JSON.parse(JSON.stringify(result)))
		})
	})
}

export async function sortActivitiesBy(db, params) {

	// To complete
	// Implemented in JS from JSON
	// Sorting: "price", "duration", "date", "seats", "type"
}

//  //  //  //  //  //  //  //  //  //  //  //
//								    //
//  FUNCIONES SECUNDARIAS, PERO NECESARIAS  //
//                                          //
//  //  //  //  //  //  //  //  //  //  //  //

function sqlBodyQueryGetActivity(){
	var sqlSelect = 'SELECT * '
	var sqlFrom = 'FROM activity '
	return sqlSelect + sqlFrom
}

function fixLowerLimit(low) {
	var lower = utilities.getNumber(low)
	if (lower === -1) {
		return 0
	}
	return lower
}

function fixUpperLimit(upp) {
	var upper = utilities.getNumber(upp)
	if (upper === -1) {
		return 100
	}
	return upper
}

function fixFilterByPrice(min, max) {
	return fixMinMax(min, max, 'a.price')
}

function fixFilterByDuration(min, max) {
	return fixMinMax(min, max, 'a.min_duration')
}

function fixFilterBySeats(min, max) {
	return fixMinMax(min, max, 'a.seats')
}

function fixFilterByDate(min, max) {
	return fixMinMax(min, max, 'a.dateAct')
}

function fixFilterByLocation(location) {
	if ((typeof location) !== 'undefined') {
		return 'AND a.location LIKE "' + location + '" '
	}
	return ''
}

function fixFilterByType(id_tags) {
	if (utilities.isEmpty(id_tags)) {
		return ''
	}
	return 'AND id_activity IN (SELECT id_activity FROM tags_act WHERE id_tags IN (' + id_tags + ') group by id_activity) '
}

function fixFilterByEntintyCreator(id_entity_creator) {
	if (utilities.isEmpty(id_entity_creator)) {
		return ''
	}
	return 'AND id_activity IN (SELECT id_activity FROM activity WHERE id_entity_creator IN (' + id_entity_creator + ') GROUP BY id_activity) '
}

function fixMinMax(min, max, tabla) {
	var pMin=utilities.getNumber(min)
	if(pMin === -1) {
		pMin = 0
	}
	var pMax=utilities.getNumber(max)
	if(pMax === -1) {
		pMax = 0
	}
	if (pMin <= pMax && pMax !== 0){
		return 'AND ' + tabla + ' BETWEEN ' + pMin + ' AND ' + pMax + ' '
	}
	return ''
}