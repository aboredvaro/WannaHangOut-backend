// import log from './log.js'

export async function getAllEntities(db) {

	return new Promise(resolve => {
		db.query('SELECT * FROM entity', (err, result) => {
			if (err) {
				console.log(err)
			}
			resolve(JSON.stringify(result))
		})
	})
}

export async function getEntityByID(db, entityID) {
	if ((await getMaxIdEntity(db)) < entityID || entityID < 1) {
		return 'id fuera de rango'
	}
	// log(sqlBodyQueryGetEntity() + 'WHERE id_entity = ' + entityID)
	return new Promise(resolve => {
		db.query(sqlBodyQueryGetEntity() + 'WHERE id_entity = ' + entityID, (err, result) => {
			if (err) {
				console.log(err)
			}
			resolve(JSON.stringify(result))
		})
	})
}

//  //  //  //  //  //  //  //  //  //  //  //
//								    //
//  FUNCIONES SECUNDARIAS, PERO NECESARIAS  //
//                                          //
//  //  //  //  //  //  //  //  //  //  //  //

async function getMaxIdEntity(db) {
	return new Promise(resolve => {
		db.query('SELECT MAX(id_entity) AS max FROM entity', (err, result) => {
			if (err) {
				console.log(err)
			}
			resolve(JSON.parse(JSON.stringify(result))[0].max)
		})
	})
}

function sqlBodyQueryGetEntity(){
	var sqlSelect = 'SELECT e.id_role, e.nick, e.name, e.surname, e.description, e.mail, e.phone, e.location, e.avatar '
	var sqlFrom = 'FROM activity a, entity e '
	return sqlSelect + sqlFrom
}
