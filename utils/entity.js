import log from './log.js'
import * as utilities from './utilities.js'
import * as query from './query.js'
import * as address from './address.js'
import * as tag from './tag.js'

/**
 * @description Registra una nueva Entidad en la BD
 * @param {*} db 
 * @param {*} req 
 * @returns Devuelve -1 en caso de error o el id_Entity de la Entidad creada
 */
export async function createNewEntity(db, req) {
	var id_role = utilities.getNumber(req.query.id_role)
	var phone = utilities.getNumber(req.query.phone)

	if (id_role === -1){
		return 'Formato incorrecto de: "Rol de usuario".'
	} else if (phone === -1){
		return 'Formato incorrecto de: "Teléfono de contacto".'
	}  else if (utilities.isEmpty(req.query.nick)) {
		return 'Formato incorrecto de: "Nick".'
	} else if (utilities.isEmpty(req.query.name)) {
		return 'Formato incorrecto de: "Nombre".'
	} else if (utilities.isEmpty(req.query.description)) {
		return 'Formato incorrecto de: "Aficciones del Usuario".'
	} else if (utilities.isEmpty(req.query.mail)) {
		return 'Formato incorrecto de: "Correo Electrónico".'
	} else if (utilities.isEmpty(req.query.pass)) {
		return 'Formato incorrecto de: "password".'
	} else if (utilities.isEmpty(req.query.tags_ent)) {
		return 'Formato incorrecto de: "password".'
	}
	
	var id_address = await address.createNewAddress(db, req)

	if (id_address === -1){
		return 'Error: NO se ha podido insertar Dirección'
	}

	// insertar la actividad
	var sql = 'INSERT INTO entity ('
	sql += 'id_role, id_address, nick, name, surname, description, mail, sha256, phone, pass, avatar, deleted) VALUES ('
	sql += id_role + ', '
	sql += id_address + ', '
	sql += '"' + req.query.nick + '", '
	sql += '"' + req.query.name + '", '
	sql += '"' + req.query.surname + '", '
	sql += '"' + req.query.description + '", '
	sql += '"' + req.query.mail + '", '
	sql += '"' + utilities.sha256(req.query.mail) + '", '
	sql += phone + ', '
	sql += '"' + req.query.pass + '", '
	sql += '"' + req.query.avatar + '", '
	sql += 0
	sql += '); '

	var idEntityCreate = new Promise(resolve => {
		db.query(sql, (err, result) => {
			if (err) {
				console.log(err)
				resolve(JSON.stringify(-1))
			}
			resolve(JSON.stringify(result.insertId))
		})
	})

	if (idEntityCreate ===-1){
		return -1
	} 

	if (!tag.insertTagsByIdOfEntitYOrActivity(db, req.query.tags_ent.split(','), await idEntityCreate, 'tags_ent', 'id_entity')) {
		return 'Error: NO se ha podido insertar Etiquetas'
	}
	
	return idEntityCreate
}

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
	return new Promise(resolve => {
		db.query(sqlBodyQueryGetEntity() + 'WHERE id_entity = ' + entityID, (err, result) => {
			if (err) {
				console.log(err)
			}
			resolve(result[0])
		})
	})
}

export async function getEntityByHash(db, entityHash) {
	return new Promise(resolve => {
		db.query(sqlBodyQueryGetEntity() + 'WHERE sha256 = ' + entityHash, (err, result) => {
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

function sqlBodyQueryGetEntity() {
	var sqlSelect = 'SELECT e.id_entity, e.id_role, e.id_address, e.nick, e.name, e.surname, e.description, e.mail, e.phone, e.avatar, e.deleted '
	var sqlFrom = 'FROM entity e '
	return sqlSelect + sqlFrom
}
