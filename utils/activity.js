import log from './log.js'
import * as estandarizar from './estandarizar.js'
import * as query from './query.js'

/**
 * @description Devuelve todas las actividades
 * @param {*} db
 * @returns JSON con todas las actividades (con el orden de la db)
 */
export async function getAllActivities(db) {

	return new Promise(resolve => {
		db.query('SELECT * FROM activity', (err, result) => {
			if (err) {
				console.log(err)
			}
			resolve(JSON.stringify(result))
		})
	})
}

/**
 * @description Registra una nueva Actividad en la BD
 * @param {*} db 
 * @param {*} req 
 * @returns Devuelve -1 en caso de error o el id_Activity de la Actividad creada
 */
export async function createNewActivity(db, req) {
	var id_entity_creador = estandarizar.getNumber(req.query.id_entity_creador)
	if (id_entity_creador === -1){
		return 'La Id_Entity Creadora tiene un formato incorrecto'
	}
	var title
	if (estandarizar.isEmpty(req.query.title)){
		return 'El Título tiene un formato incorrecto'
	} else {
		title = req.query.title
	}
	var description
	if (estandarizar.isEmpty(req.query.description)){
		return 'La Descripción tiene un formato incorrecto'
	} else {
		description = req.query.description
	}
	var seats = estandarizar.getNumber(req.query.seats)
	if (seats === -1){
		return 'La Cantidad Máxima de Plazas tiene un formato incorrecto'
	}
	var price = estandarizar.getNumber(req.query.price)
	if (price === -1){
		return 'El Precio tiene un formato incorrecto'
	}
	var location
	if (estandarizar.isEmpty(req.query.location)){
		return 'La Localidad del Evento tiene un formato incorrecto'
	} else {
		location = req.query.location
	}
	var dateAct
	if (estandarizar.isEmpty(req.query.dateAct)){
		return 'La Fecha del Evento tiene un formato incorrecto'
	} else {
		dateAct = req.query.dateAct
	}
	var min_duration = estandarizar.getNumber(req.query.min_duration)
	if (min_duration === -1){
		return 'La duración del Evento tiene un formato incorrecto'
	}
	var tags_act
	if (estandarizar.isEmpty(req.query.tags_act)){
		return 'Las Tags tienen un formato incorrecto'
	} else {
		tags_act = req.query.tags_act
	}
	var sqlInsert = 'INSERT INTO Activity ( '
	sqlInsert += 'id_entity_creador, title, description, seats, price, location, dateAct, min_duration) VALUES ('
	sqlInsert += id_entity_creador + ', '
	sqlInsert += '"' + title + '", '
	sqlInsert += '"' + description + '", '
	sqlInsert += seats + ', '
	sqlInsert += price + ', '
	sqlInsert += '"' + location + '", '
	sqlInsert += '"' + dateAct + '", '
	sqlInsert += min_duration + '); '
	var idActivityCreada = new Promise(resolve => {
		db.query(sqlInsert, (err, result) => {
			if (err) {
				console.log(err)
			}
			resolve(JSON.stringify(result.insertId))
		})
	})
	tags_act = tags_act.split(',')
	sqlInsert = 'INSERT INTO tags_act ('
	sqlInsert += 'id_activity, id_tags) VALUES ' 
	for (const i in tags_act) {
		sqlInsert += '(' + await idActivityCreada + ', ' + tags_act[i]
		if ( i < (tags_act.length - 1)){
			sqlInsert += '), '
		} else {
			sqlInsert += '); '
		}
	}
	new Promise(resolve => {
		db.query(sqlInsert, (err, result) => {
			if (err) {
				console.log(err)
			}
			resolve(JSON.stringify(result))
		})
	})
	return idActivityCreada
}

/**
 * @description Devuelve una actividad dado el id de dicha actividad
 * @param {*} db Base de Datos de consulta
 * @param {*} activityID id a consultar
 * @returns JSON con los siguientes datos {"id_activity", "title", "description", "seats", 
 * 		  "price", "location", "dateAct", "min_duration", "id_entity_creador"}
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
			log(sqlBodyQueryGetActivity() + 'WHERE id_activity = ' + activityID)
			resolve(JSON.stringify(result))
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
 * @description Devuelve el nick del creador de una actividad, dado el id de dicha actividad
 * @param {*} db Base de Datos de consulta
 * @param {*} activityID id a consultar
 * @returns JSON con los siguientes datos {"nick"}
 */
export async function getCreatorEntityOfActivityByID(db, activityID) {
	if ((await query.getMaxIdFromTable(db, 'activity')) < activityID || activityID < 1) {
		return 'id fuera de rango'
	}
	var sqlSelect = 'SELECT nick '
	var sqlFrom = 'FROM entity e '
	var sqlWhere = 'WHERE id_entity = (SELECT id_entity_creador FROM activity WHERE id_activity =' + activityID + ');'
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
 * 		  "price", "location", "dateAct", "min_duration", "id_entity_creador"}
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
	log(sqlBodyQueryGetActivity() + sqlWhere + sqlLimit)
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
	var sqlSelect = 'SELECT a.id_activity, a.title, a.description, a.seats, a.price, a.location, a.dateAct, a.min_duration, a.id_entity_creador '
	var sqlFrom = 'FROM activity a '
	return sqlSelect + sqlFrom
}

function fixLowerLimit(low) {
	var lower = estandarizar.getNumber(low)
	if (lower === -1) {
		return 0
	}
	return lower
}

function fixUpperLimit(upp) {
	var upper = estandarizar.getNumber(upp)
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
	if (estandarizar.isEmpty(id_tags)) {
		return ''
	}
	return 'AND id_activity IN (SELECT id_activity FROM tags_act WHERE id_tags IN (' + id_tags + ') group by id_activity) '
}

function fixFilterByEntintyCreator(id_entity_creator) {
	if (estandarizar.isEmpty(id_entity_creator)) {
		return ''
	}
	return 'AND id_activity IN (SELECT id_activity FROM activity WHERE id_entity_creador IN (' + id_entity_creator + ') GROUP BY id_activity) '
}

function fixMinMax(min, max, tabla) {
	var pMin=estandarizar.getNumber(min)
	if(pMin === -1) {
		pMin = 0
	}
	var pMax=estandarizar.getNumber(max)
	if(pMax === -1) {
		pMax = 0
	}
	if (pMin <= pMax && pMax !== 0){
		return 'AND ' + tabla + ' BETWEEN ' + pMin + ' AND ' + pMax + ' '
	}
	return ''
}