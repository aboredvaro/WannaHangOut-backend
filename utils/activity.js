import log from './log.js'

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

//export async function createNewActivity(db, req) {
//	return 'Hola'
//}

export async function getActivityByID(db, activityID) {
	if ((await getMaxIdActivity(db)) < activityID || activityID < 1) {
		return 'id fuera de rango'
	}
	return new Promise(resolve => {
		db.query('SELECT * FROM activity WHERE id_activity = ' + activityID, (err, result) => {
			if (err) {
				console.log(err)
			}
			resolve(JSON.stringify(result))
		})
	})
	
}

export async function filterActivitiesBy(db, req) {
	// To complete
	// Implemented in SQL
	// Return activity list filtered in SQL by "price"-, "duration"-, "date"-, "seats"-, "location"-, "type"
	// SQL Limit ("lowerLimit" y "upperLimit")

	var sqlSelect = 'SELECT a.id_activity, a.title, a.description, a.seats, a.price, a.location, a.dateAct, a.min_duration, a.id_entity_creador, e.nick as organizer '
	var sqlFrom = 'FROM activity a, entity e '
	var sqlWhere = 'WHERE a.id_entity_creador = e.id_entity '
	sqlWhere = sqlWhere + fixFilterByLocation(req.query.location)
	sqlWhere = sqlWhere + fixFilterByPrice(req.query.price_min, req.query.price_max)
	sqlWhere = sqlWhere + fixFilterByDuration(req.query.min_duration_min, req.query.min_duracion_max)
	sqlWhere = sqlWhere + fixFilterBySeats(req.query.seats_min, req.query.seats_max)
	sqlWhere = sqlWhere + fixFilterByDate(req.query.dateAct_min, req.query.dateAct_max)
	var sqlLimit = 'LIMIT ' + fixLowerLimit(req.query.lowerLimit) + ', ' + fixUpperLimit(req.query.upperLimit) + ';'

	log(sqlSelect + sqlFrom + sqlWhere + sqlLimit)

	return new Promise(resolve => {
		db.query(sqlSelect + sqlFrom + sqlWhere + sqlLimit, (err, result) => {
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

function fixLowerLimit(low) {
	var lowerLimit = 0
	if(!isNaN(parseInt(low))) {
		lowerLimit = parseInt(low)
	}
	return lowerLimit
}

function fixUpperLimit(upper) {
	var upperLimit = 100
	if(!isNaN(parseInt(upper))) {
		upperLimit = parseInt(upper)
	}
	return upperLimit
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

// Precondición: 	Si viene solo 'max', el rango será [0,max)
//				Si viene 'min' y 'max', el rango será [min,max), se supone que min<max
function fixMinMax(min, max, tabla) {
	var pMin=0
	if(!isNaN(parseInt(min)) ) {
		pMin = parseInt(min)
	}
	var pMax=0
	if((typeof max) !== 'undefined') {
		pMax = parseInt(max)
	}
	if (pMin <= pMax && pMax !== 0){
		return 'AND ' + tabla + ' BETWEEN ' + pMin + ' AND ' + pMax + ' '
	}
	return ''
}

function fixFilterByLocation(location) {
	let sql = ''
	if ((typeof location) !== 'undefined') {
		sql = 'AND a.location LIKE "' + location + '" '
	}
	return sql
}

function fixFilterByType(id_types) {
	return 'AND id_activity IN (SELECT * FROM id_tags WHERE id_activity IN (' + id_types + ') '
}

function fixFilterByEntintyCreator(id_entity_creator) {
	return 'AND id_entinty_creator = ' + id_entity_creator + ' '
}