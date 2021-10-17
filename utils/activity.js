import log from './log.js'
import * as estandarizar from './estandarizar.js'

export async function createNewActivity(db, req) {
	
	var sqlInsert = 'INSERT INTO Activity(id_entity_creador, title, description, seats, price, location, dateAct, min_duration) '
	sqlInsert += 'VALUES(' + parseInt(req.query.id_entity_creador) + ', ' + req.query.title + ', ' + req.query.description + ', ' + parseInt(req.query.seats) + ', ' + parseFloat(req.query.price) + ', ' + req.query.location + ', ' 
	+ Date.parse(req.query.dateAct) + ', ' + parseInt(req.query.min_duration) + ')'
	
	log(sqlInsert)

	return new Promise(resolve => {
		db.query(sqlInsert, (err, result) => {
			if (err) {
				console.log(err)
			}
			resolve('Done')
		})
	})
}

/**
 * @description Devuelve una actividad dado el id de dicha actividad
 * @param {*} db Base de Datos de consulta
 * @param {*} activityID id a consultar
 * @returns JSON con los siguientes datos {"id_activity", "title", "description", "seats", 
 * 		  "price", "location", "dateAct", "min_duration", "id_entity_creador"}
 */
export async function getActivityByID(db, activityID) {
	if ((await getMaxIdActivity(db)) < activityID || activityID < 1) {
		return 'id fuera de rango'
	}
	log(sqlBodyQueryGetActivity() + 'WHERE id_activity = ' + activityID)
	return new Promise(resolve => {
		db.query(sqlBodyQueryGetActivity() + 'WHERE id_activity = ' + activityID, (err, result) => {
			if (err) {
				console.log(err)
			}
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
	if ((await getMaxIdActivity(db)) < activityID || activityID < 1) {
		return 'id fuera de rango'
	}
	var sqlSelect = 'SELECT t.id_tags, t.name '
	var sqlFrom = 'FROM tags_act ta, tags t '
	var sqlWhere = 'WHERE ta.id_tags = t.id_tags AND ta.id_activity = ' + activityID + ';'

	log(sqlSelect + sqlFrom + sqlWhere)
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
	if ((await getMaxIdActivity(db)) < activityID || activityID < 1) {
		return 'id fuera de rango'
	}
	var sqlSelect = 'SELECT nick '
	var sqlFrom = 'FROM entity e '
	var sqlWhere = 'WHERE id_entity = (SELECT id_entity_creador FROM activity WHERE id_activity =' + activityID + ');'

	log(sqlSelect + sqlFrom + sqlWhere)
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
	var sqlSelectAndFrom = sqlBodyQueryGetActivity()
	var sqlWhere = 'WHERE a.id_entity_creador = e.id_entity '
	sqlWhere = sqlWhere + fixFilterByLocation(req.query.location)
	sqlWhere = sqlWhere + fixFilterByPrice(req.query.price_min, req.query.price_max)
	sqlWhere = sqlWhere + fixFilterByDuration(req.query.min_duration_min, req.query.min_duracion_max)
	sqlWhere = sqlWhere + fixFilterBySeats(req.query.seats_min, req.query.seats_max)
	sqlWhere = sqlWhere + fixFilterByDate(req.query.dateAct_min, req.query.dateAct_max)
	sqlWhere = sqlWhere + fixFilterByType(req.query.id_tags)
	sqlWhere = sqlWhere + fixFilterByEntintyCreator(req.query.id_entity_creator)
	var sqlLimit = 'LIMIT ' + fixLowerLimit(req.query.lowerLimit) + ', ' + fixUpperLimit(req.query.upperLimit) + ';'

	log(sqlSelectAndFrom + sqlWhere + sqlLimit)

	return new Promise(resolve => {
		db.query(sqlSelectAndFrom + sqlWhere + sqlLimit, (err, result) => {
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

async function getMaxIdActivity(db) {
	return new Promise(resolve => {
		db.query('SELECT MAX(id_activity) AS max FROM activity', (err, result) => {
			if (err) {
				console.log(err)
			}
			resolve(JSON.parse(JSON.stringify(result))[0].max)
		})
	})
}

function sqlBodyQueryGetActivity(){
	var sqlSelect = 'SELECT a.id_activity, a.title, a.description, a.seats, a.price, a.location, a.dateAct, a.min_duration, a.id_entity_creador '
	var sqlFrom = 'FROM activity a, entity e '
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