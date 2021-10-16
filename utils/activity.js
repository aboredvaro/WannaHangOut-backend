import log from './log.js'

export async function createNewActivity(db, params) {

	// To complete
	
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
 * @field req.query.tags --> tags para filtrar por etiquetas
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
	var sqlFrom = 'FROM activity a '
	return sqlSelect + sqlFrom

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

/* Del año pasado... esperando la inspiración
function getSubconsultaCaracterisiticasSecundarias(entrada, parametro) {
    if (entrada === 'undefined' || entrada == '') {
        return '';
    }
    let subConsulta = String(entrada).split(',');
    let j = subConsulta.length;
    let resultado = '';
    let select = 'id_catastro';
    let from = '(';
    for (let i = 0; i < j; i++) {
        from += 'SELECT co' + i + '.id_catastro, ca' + i + '.caracteristica ';
        from += 'FROM caractsecundarias ca' + i + ', contiene co' + i + ' ';
        from +=
            'WHERE ca' +
                i +
                '.id_caractSecundaria = co' +
                i +
                '.id_caractSecundaria and ca' +
                i +
                '.id_caractSecundaria = "' +
                subConsulta[i] +
                '"';
        if (i + 1 < j)
            from += ' UNION ALL ';
    }
    from += ') ' + parametro;
    let group = 'id_catastro HAVING COUNT(id_catastro) = ' + j;
    resultado =
        ' AND inm.id_catastro IN (SELECT ' + select + ' FROM ' + from + ' GROUP BY ' + group + ')';
    return resultado;
}
*/

function fixFilterByEntintyCreator(id_entity_creator) {
	return 'AND id_entinty_creator = ' + id_entity_creator + ' '
}