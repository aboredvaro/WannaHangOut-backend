import log from './log.js'
import * as query from './query.js'

export async function getAllEntities(db) {

	return new Promise(resolve => {
		db.query('SELECT * FROM entity', (err, result) => {
			if (err) {
				console.log(err)
			}
			resolve(result)
		})
	})
}

export async function getEntityByID(db, entityID) {
	if ((await query.getMaxIdFromTable(db, 'entity')) < entityID || entityID < 1) {
		return 'id fuera de rango'
	}
	log(sqlBodyQueryGetEntity() + 'WHERE id_entity = ' + entityID)
	return new Promise(resolve => {
		db.query(sqlBodyQueryGetEntity() + 'WHERE id_entity = ' + entityID, (err, result) => {
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

function sqlBodyQueryGetEntity(){
	var sqlSelect = 'SELECT e.id_entity, e.id_role, e.id_address, e.nick, e.name, e.surname, e.description, e.mail, e.phone, e.avatar, e.deleted '
	var sqlFrom = 'FROM entity e '
	return sqlSelect + sqlFrom
}