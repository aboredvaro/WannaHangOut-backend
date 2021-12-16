import log from './log.js'
import * as utilities from './utilities.js'
import * as query from './query.js'
import * as address from './address.js'

/**
 * @description Registra una nueva Actividad en la BD
 * @param {*} db 
 * @param {*} req 
 * @returns Devuelve -1 en caso de error o el id_Activity de la Actividad creada
 */
export async function createNewActivity(db, req) {
	var id_entity_creator = utilities.getNumber(req.body.id_entity_creator)
	var seats = utilities.getNumber(req.body.seats)
	var price = utilities.getNumber(req.body.price)
	var min_duration = utilities.getNumber(req.body.min_duration)

	if (min_duration === -1){
		return 'Formato incorrecto de: "Duración del Evento".'
	} else if (price === -1) {
		return 'Formato incorrecto de: "Precio".'
	} else if (seats === -1) {
		return 'Formato incorrecto de: "Número de plazas".'
	} else if (id_entity_creator === -1) {
		return 'Formato incorrecto de: "Id del Organizador".'
	} else if (utilities.isEmpty(req.body.title)) {
		return 'Formato incorrecto de: "Título del Evento".'
	} else if (utilities.isEmpty(req.body.description)) {
		return 'Formato incorrecto de: "Descripción del Evento".'
	} else if (utilities.isEmpty(req.body.dateAct)) {
		return 'Formato incorrecto de: "Fecha del Evento".'
	} else if (utilities.isEmpty(req.body.tags_act)) {
		return 'Formato incorrecto de: "Etiquetas identificadoras".'
	}

	var id_address = await address.createNewAddress(db, req)
	if (id_address === -1){
		return 'Error: NO se ha podido insertar Dirección'
	}

	var sql = 'INSERT INTO activity ('
	sql += 'id_entity_creator, id_address, title, description, seats, price, dateAct, min_duration) VALUES ('
	sql += id_entity_creator + ', '
	sql += id_address + ', '
	sql += '"' + req.body.title + '", '
	sql += '"' + req.body.description + '", '
	sql += seats + ', '
	sql += price + ', '
	sql += '"' + req.body.dateAct + '", '
	sql += min_duration
	sql += '); '

	const idActivityCreate = new Promise(resolve => {
		db.query(sql, (err, result) => {
			if (err) {
				console.log(err)
				resolve(JSON.stringify(-1))
			}
			resolve(result.insertId)
		})
	})

	if (await idActivityCreate === -1){
		return -1
	} 
	
	let arr = []
	for(let i of req.body.tags_act) {
		arr.push(parseInt(i))
	}
	if (!query.queryInsertOneToMuch(db, await idActivityCreate, arr, 'tags_act', 'id_activity', 'id_tags')) {
		return 'Error: NO se ha podido insertar Etiquetas'
	}
	
	return await idActivityCreate
}

/**
 * @description Actualiza los datos de una Actividad
 * @param {*} db 
 * @param {*} req 
 * @returns Devuelve false en caso de error true en caso contrario
 */
export async function updateActivity(db, req) {
	var id_activity = utilities.getNumber(req.body.id_activity)
	var id_entity_creator = utilities.getNumber(req.body.id_entity_creator)
	var seats = utilities.getNumber(req.body.seats)
	var price = utilities.getNumber(req.body.price)
	var min_duration = utilities.getNumber(req.body.min_duration)
	var deleted = utilities.getNumber(req.body.deleted)

	if (id_activity === -1){
		return 'Formato incorrecto de: "id_activity.'
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
	} else if (utilities.isEmpty(req.body.title)) {
		return 'Formato incorrecto de: "Título del Evento".'
	} else if (utilities.isEmpty(req.body.description)) {
		return 'Formato incorrecto de: "Descripción del Evento".'
	} else if (utilities.isEmpty(req.body.dateAct)) {
		return 'Formato incorrecto de: "Fecha del Evento".'
	}

	if (!address.updateAddress(db, req)){
		return 'Error: NO se ha podido actualizar la Dirección'
	}

	if (!utilities.isEmpty(req.body.tags_act)) {
		if (!query.deleteSimpleFromTable(db, id_activity, 'tags_act', 'id_activity')) {
			return 'Error: NO se ha podido eliminar Etiquetas'
		}
		let arr = []
		for(let i of req.body.tags_act) {
			arr.push(parseInt(i))
		}
		if (!query.queryInsertOneToMuch(db, id_activity, arr, 'tags_act', 'id_activity', 'id_tags')) {
			return 'Error: NO se ha podido insertar Etiquetas'
		}
	}

	var sql = 'UPDATE activity SET '
	sql += 'id_entity_creator = ' + id_entity_creator + ', '
	sql += 'title = "' + req.body.title + '", '
	sql += 'description = "' + req.body.description + '", '
	sql += 'seats = ' + seats + ', '
	sql += 'price = ' + price + ', '
	sql += 'dateAct = "' + req.body.dateAct + '", '
	sql += 'min_duration = ' + min_duration + ', '
	sql += 'deleted = ' + deleted + ' '
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
 * @description Marca como borrada una activity
 * @param {*} db 
 * @param {*} id_entity 
 * @returns Devuelve false en caso de error true en caso contrario
 */
export async function deleteActivityById(db, id_activity) {

	var sql = 'UPDATE activity SET '
	sql += 'deleted = ' + 1 + ' '
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
 * @deprecated		Lo cambiamos para la feria por consulta hipermegatroncha
 * @description 	Devuelve un JSON sin filtrar, con todas las Actividades NO BORRADAS
 * @param {*} 		db
 * @returns 		JSON
 */
export async function getAllActivities1(db) {
	var sql = sqlBodyQueryGetActivity() + 'WHERE dateAct >= now() AND deleted = ' + 0 + ' '
	sql += 'ORDER BY dateAct ASC '

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
 * @deprecated			Lo cambiamos para la feria por consulta hipermegatroncha
 * @description 		Devuelve una actividad dado el id de dicha actividad
 * @param {*} db 		Base de Datos de consulta
 * @param {*} activityID id a consultar
 * @returns 			JSON con los siguientes datos {"id_activity", "title", "description", "seats", 
 * 		  				"price", "location", "dateAct", "min_duration", "id_entity_creator"}
 */
export async function getActivityByID1(db, activityID) {
	if ((await query.getMaxIdFromTable(db, 'activity')) < activityID || activityID < 1) {
		return 'Este id no pertenece a ninguna actividad'
	}
	if(await query.isDeleted(db, 'activity', 'id_activity', activityID)) {
		return ('Este id fue borrado de la BD')
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
 * @description	Devuelve todas las actividades no borradas o a partir de la fecha de hoy
 * @param {*} db 	Base de datos donde hacer la consulta
 * @returns 		JSON con todos los datos necesarios de una actividad
 */
export async function getActivityByID(db, activityID) {
	var sql = sqlBodyActividad() + 'AND ac.id_activity = ' + activityID
	/*
	return new Promise(resolve => {
		db.query(sql , (err, result) => {
			if (err) {
				console.log(err)
			}
			resolve(result)
		})
	})
	*/
		
	let sql1 = new Promise(resolve => {
		db.query(sql , (err, result) => {
			if (err) {
				console.log(err)
			}
			resolve(result)
		})
	})

	sql = 'select ta.id_tags, t.name '
	sql += 'from tags_act ta, tags t '
	sql += 'where ta.id_tags = t.id_tags '
	sql += 'and ta.id_activity = ' + activityID
	let sql2 = new Promise(resolve => {
		db.query(sql , (err, result) => {
			if (err) {
				console.log(err)
			}
			resolve(result)
		})
	})

	let json = await sql1
	let tag = await sql2
	json[0].tags = {...tag}
	return json[0]
}

/**
 * @description	Devuelve todas las actividades no borradas o a partir de la fecha de hoy
 * @param {*} db 	Base de datos donde hacer la consulta
 * @returns 		JSON con todos los datos necesarios de una actividad
 */
export async function getAllActivities(db) {
	var sql = sqlBodyActividad() + 'AND dateAct >= now() '
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
 * @description		Devuelve todas las actividades creadas por una entidad
 * @param {*} db 		Base de datos donde se hace la consulta
 * @param {*} id_entity 	id de la entidad a consultar
 * @returns 			Devuelve un JSON con todos los datos de la actividad
 */
export async function getActivitiesCreatedByEntity(db, id_entity){
	if (utilities.getNumber(id_entity) == -1) {
		return 'Formato incorrecto de: "id_entity".'
	}

	var sql = sqlBodyActividad() + 'AND ac.id_entity_creator = ' + id_entity + ' '
	sql += 'ORDER BY dateAct ASC '
	
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
 * @description		Devuelve todas las actividades NO BORRADAS a las que se ha apuntado una ENTIDAD
 * @param {*} db 		Base de datos donde se hace la consulta
 * @param {*} id_entity 	id de la entidad a consultar
 * @returns 			Devuelve un JSON con todos los datos de la actividad
 */
export async function getActivitiesUserSignUpTo(db, id_entity){
	if (id_entity === -1){
		return 'Formato incorrecto de: "id_entity".'
	} 
	
	var sql = sqlBodyActividad() + 'AND ac.id_activity IN (SELECT id_activity FROM entityToActivity WHERE id_entity = ' + id_entity + ') '
	sql += 'ORDER BY dateAct ASC '
	
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
 * @description Esta función es genérica, se encarga de aplicar varios filtros, según los criterios 
 * 			 seleccionados de "price", "duration", "date", "seats", "id_address", "type".
 * 			 La cantidad de "activities" devueltas está comprendida entre [lowerLimit, upperLimit]
 * @param {*} db 
 * @param {*} req 
 * @property Si viene solo 'max', el rango será [0,max)
 * @property Si viene solo 'min', el rango sera [min, maximo de la BD] <--Queda imlementar
 * @property Si viene 'min' y 'max', el rango será [min,max), se supone que min<max
 * @field req.body.location --> String para filtrar por localidad
 * @field req.body.price_min, req.body.price_max --> number para filtrar por precios
 * @field req.body.min_duration_min, req.body.min_duracion_max --> number para filtar por tiempo (minutos) de duración
 * @field req.body.seats_min, req.body.seats_max --> number para filtrar por aforo máximo
 * @field req.body.dateAct_min, req.body.dateAct_max -- date para filtrar por fechas de evento
 * @field req.body.tags --> lista de number para filtrar por etiquetas, deben venir separados por comas y sin espacios ni paréntesis p.e: 1,2,3
 * @field req.body.id_entity_creator --> lista de number para filtrar por creadores de eventos, deben venir separados por comas y sin espacios ni paréntesis p.e: 1,2,3
 * @returns JSON con los siguientes datos {"id_activity", "title", "description", "seats", 
 * 		  "price", "location", "dateAct", "min_duration", "id_entity_creator"}
 */
export async function filterActivitiesBy1(db, req) {
	var sql = 'SELECT id_activity, nick, title, activity.description, seats, price, dateAct, min_duration, address.id_address, province, codPos, location, direction, latitude, longitude '
	sql += 'FROM activity, address, provinces, entity '
	sql += 'WHERE activity.id_address = address.id_address '
	sql += 'AND entity.id_entity = activity.id_entity_creator '
	sql += 'AND provinces.id_province = address.id_province '
	sql += 'AND activity.deleted = 0 '
	sql += 'AND dateAct >= now() '
	sql += fixFilterByLocation(req.body.location)
	sql += fixFilterByPrice(req.body.price_min, req.body.price_max)
	sql += fixFilterByDuration(req.body.min_duration_min, req.body.min_duracion_max)
	sql += fixFilterBySeats(req.body.seats_min, req.body.seats_max)
	sql += fixFilterByDate(req.body.dateAct_min, req.body.dateAct_max)
	sql += fixFilterByType(req.body.id_tags)
	sql += fixFilterByEntintyCreator(req.body.id_entity_creator)
	sql += 'ORDER BY dateAct ASC '
	sql += 'LIMIT ' + fixLowerLimit(req.body.lowerLimit) + ', ' + fixUpperLimit(req.body.upperLimit) + ';'

	//log(sql)
	return new Promise(resolve => {
		db.query(sql, (err, result) => {
			if (err) {
				console.log(err)
			}
			resolve(result)
		})
	})
}

export async function filterActivitiesBy(db, req) {
	var sql = sqlBodyActividad()
	sql += fixFilterByLocation(req.query.location)
	sql += fixFilterByPrice(utilities.isEmpty(req.query.free) ? true : req.query.free , utilities.isEmpty(req.query.paid) ? true : req.query.paid)
	sql += fixFilterByDuration(req.query.min_duration_min, req.query.min_duracion_max)
	sql += fixFilterBySeats(req.query.seats_min, req.query.seats_max)
	sql += fixFilterByDate(req.query.dateAct_min, req.query.dateAct_max)
	sql += fixFilterByType(req.query.id_tags)
	sql += fixFilterByEntintyCreator(req.query.id_entity_creator)
	sql += 'ORDER BY dateAct ASC '
	sql += 'LIMIT ' + fixLowerLimit(req.query.lowerLimit) + ', ' + fixUpperLimit(req.query.upperLimit) + ';'

	//log(sql)
	return new Promise(resolve => {
		db.query(sql, (err, result) => {
			if (err) {
				console.log(err)
			}
			resolve(result)
		})
	})
}

export async function getLocationWithActivities(db){
	var sql = 'SELECT DISTINCT ad.location '
	sql += 'FROM activity ac, address ad '
	sql += 'WHERE ac.deleted = 0 AND ac.id_address = ad.id_address;'
	return new Promise(resolve => {
		db.query(sql, (err, result) => {
			if (err) {
				console.log(err)
			}
			resolve(result)
		})
	})
}

export async function getEntitiesWithActivities(db){
	var sql = 'SELECT DISTINCT e.id_entity, e.nick '
	sql += 'FROM activity a, entity e '
	sql += 'WHERE e.deleted = 0 AND a.deleted = 0 AND a.id_entity_creator = e.id_entity;'
	return new Promise(resolve => {
		db.query(sql, (err, result) => {
			if (err) {
				console.log(err)
			}
			resolve(result)
		})
	})
}

export async function checkIfUserInActivity(db, id_entity, id_activity){
	if (id_entity === -1){
		return 'Formato incorrecto de: "id_entity".'
	} else if (id_activity === -1){
		return 'Formato incorrecto de: "id_activity".'
	}

	var sql = 'SELECT EXISTS(SELECT * FROM entitytoactivity WHERE  '
	sql += 'id_entity = ' + id_entity + ' '
	sql += 'and id_activity = ' + id_activity +') as cond; '
	//log(sql)
	return new Promise(resolve => {
		db.query(sql, (err, result) => {
			if (err) {
				console.log(err)
			}
			resolve(result[0])
		})
	})
}

export async function isActivityDeprecated(db, id_activity){
	var sql = 'SELECT COUNT(*) as cnt '
	sql += 'FROM activity '
	sql += 'WHERE id_activity = ' + id_activity +' AND dateAct>=now(); '
	var cnt = new Promise(resolve => {
		db.query(sql, (err, result) => {
			if (err) {
				console.log(err)
				resolve(-1)
			}
			resolve(result.cnt)
		})
	})
	if (cnt === 0) return true
	return false
}

export async function isActivityDeleted(db, id_activity){
	var sql = 'SELECT COUNT(*) as cnt '
	sql += 'FROM activity '
	sql += 'WHERE id_activity = ' + id_activity +' AND deleted=1; '
	var cnt = new Promise(resolve => {
		db.query(sql, (err, result) => {
			if (err) {
				console.log(err)
				resolve(-1)
			}
			resolve(result.cnt)
		})
	})
	if (cnt === 1) return true
	return false
}

export async function getSeatAvailables(db, id_activity){
	var sql = 'SELECT ( '
	sql += 'SELECT seats FROM activity WHERE id_activity = ' + id_activity
	sql += ') - ('
	sql += 'SELECT COUNT(*) FROM entitytoactivity WHERE id_activity = ' + id_activity
	sql += ') as seatsAvailable'
	return Promise(resolve => {
		db.query(sql, (err, result) => {
			if (err) {
				console.log(err)
				resolve(-1)
			}
			resolve(result.cnt)
		})
	})
}

export async function searchActivitiesByKeywords(db, keyWords){
	var select = 'SELECT a.id_activity, a.title, a.dateAct, a.min_duration, a.price, ad.location, ad.codPos, ad.direction, a.seats - (SELECT COUNT(*) FROM entitytoactivity WHERE id_activity = a.id_activity) as seatsAvailable, ROUND(1-((a.seats - (SELECT COUNT(*) FROM entitytoactivity WHERE id_activity = a.id_activity)) / 100),2) as ocupation '
	var from = 'FROM activity a, address ad '
	var where = 'WHERE a.id_address = ad.id_address AND a.deleted = 0 AND a.dateAct >= now() ' 
	var rest = 'ORDER BY dateAct ASC LIMIT 5;'
	keyWords.forEach(function (word) {
		where += 'AND a.title LIKE "%' + word + '%" ' 
	})
	var sql = select + from + where + rest
	return new Promise(resolve => {
		db.query(sql, (err, result) => {
			if (err) {
				console.log(err)
			}
			resolve(result)
		})
	})
}

//  //  //  //  //  //  //  //  //  //  //  //
//								    //
//  FUNCIONES SECUNDARIAS, PERO NECESARIAS  //
//                                          //
//  //  //  //  //  //  //  //  //  //  //  //

function sqlBodyActividad(){
	var select = 'SELECT ac.id_activity, ac.title, ac.description, ac.seats, '
	select += 'ac.seats - (SELECT COUNT(*) FROM entitytoactivity WHERE id_activity = ac.id_activity) as seatsAvailable, '
	select += 'ROUND(1-((ac.seats - (SELECT COUNT(*) FROM entitytoactivity WHERE id_activity = ac.id_activity)) / 100),2) as ocupation, '
	select += 'ac.price, ac.dateAct, ac.min_duration, '
	select += '(SELECT i.urlPath FROM images i, img_act im WHERE im.id_image = i.id_image AND im.deleted = 0 AND id_activity = ac.id_activity ORDER BY i.id_image ASC LIMIT 1) as urlPath, '
	select += 'en.id_entity as id_entity_creator, en.name, '
	select += '(SELECT COUNT(a.id_activity) FROM review r, activity a WHERE a.id_activity = r.id_activity AND r.deleted = 0 AND a.deleted = 0 AND a.id_entity_creator = en.id_entity) as totalReviewsOfEntity, '
	select += '(SELECT ROUND(AVG(r.points),2) FROM review r, activity a WHERE a.id_activity = r.id_activity AND r.deleted = 0 AND a.deleted = 0 AND a.id_entity_creator = en.id_entity) as avgScoreOfEntity, '
	select += 'en.avatar, ad.id_address, ad.direction, ad.codPos, ad.location, pr.province, ad.latitude, ad.longitude '
	var from = 'FROM activity ac, entity en, address ad, provinces pr '
	var where = 'WHERE ac.id_entity_creator = en.id_entity '
	where += 'and ac.deleted = 0 '
	where += 'and ad.id_address = ac.id_address '
	where += 'and ad.id_province = pr.id_province '

	return select + from + where
}

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

function fixFilterByPrice(free, paid) {
	// free = true --> las actividades con precio = 0
	// paid = true --> las actividades con precio > 0.
	free = JSON.parse(free)
	paid = JSON.parse(paid)
	if( free !== paid ) {
		if ( free ) {
			return 'AND ac.price = 0 '
		} else {
			return 'AND ac.price > 0 '
		}
	}
	return ''
}

function fixFilterByDuration(min, max) {
	return fixMinMax(min, max, 'min_duration')
}

function fixFilterBySeats(min, max) {
	return fixMinMax(min, max, 'seats')
}

function fixFilterByDate(min, max) {
	if(utilities.isEmpty(min) || utilities.isEmpty(max) ){
		return ''
	}

	var dtMin = new Date(min)
	var dtMax = new Date(max)

	if (dtMax.valueOf() < dtMin.valueOf()) {
		var dtAux = new Date(min)
		dtMin = dtMax
		dtMax = dtAux
	}

	var stMin = dtMin.getFullYear() + '-' + (dtMin.getMonth()+1) + '-' + dtMin.getDate()
	var stMax = dtMax.getFullYear() + '-' + (dtMax.getMonth()+1) + '-' + dtMax.getDate()

	return 'AND ac.dateAct BETWEEN "' + stMin + '" AND "' + stMax + '" '
	//return ''
}

function fixFilterByLocation(location) {
	if ((typeof location) !== 'undefined') {
		return 'AND ad.location = "' + location + '" '
	}
	return ''
}

function fixFilterByType(id_tags) {
	if (utilities.isEmpty(id_tags)) {
		return ''
	}
	return 'AND ac.id_activity IN (SELECT t.id_activity FROM tags_act t WHERE t.id_tags IN (' + id_tags + ') GROUP BY t.id_activity) '
}

function fixFilterByEntintyCreator(id_entity_creator) {
	if (utilities.isEmpty(id_entity_creator)) {
		return ''
	}
	return 'AND ac.id_activity IN (SELECT a1.id_activity FROM activity a1 WHERE a1.id_entity_creator IN (' + id_entity_creator + ') GROUP BY a1.id_activity) '
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