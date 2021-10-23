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

export async function createNewEntity(db, req) {
	//comprobar que el usuario no exista ya
	//comprobar que el correo no exista ya
	//comprobar que el telf no exista ya

	var sqlInsert = 'INSERT INTO entity ( id_role, id_address, nick, name, surname, description, mail, phone, pass, avatar) VALUES ( '
	sqlInsert += parseInt(req.query.id_role) + ', '
	sqlInsert += parseInt(req.query.id_address) + ', '
	sqlInsert += req.query.nick + ', '
	sqlInsert += req.query.name + ', '
	sqlInsert += req.query.surname + ', '
	sqlInsert += req.query.description + ', '
	sqlInsert += req.query.mail + ', '
	sqlInsert += parseInt(req.query.phone) + ', '
	sqlInsert += req.query.pass + ', '
	sqlInsert += req.query.avatar + ')'

	log(sqlInsert)
	var idCreatedEntity = new Promise(resolve => {
		db.query(sqlInsert, (err, result) => {
			if (err) {
				console.log(err)
			}
			resolve(JSON.stringify(result.insertId))
		})
	})

	var tags_ent = req.query.tags_ent.split(',')
	sqlInsert = 'INSERT INTO tags_ent ('
	sqlInsert += 'id_entity, id_tags) VALUES ' 
	for (const i in tags_ent) {
		sqlInsert += '(' + await idCreatedEntity+ ', ' + tags_ent[i]
		if ( i < (tags_ent.length - 1)){
			sqlInsert += '), '
		} else {
			sqlInsert += '); '
		}
	}
	log(sqlInsert)
	new Promise(resolve => {
		db.query(sqlInsert, (err, result) => {
			if (err) {
				console.log(err)
			}
			resolve(JSON.stringify(result))
		})
	})

	return idCreatedEntity
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
