import log from './log.js'
import * as utilities from './utilities.js'
import * as query from './query.js'
import * as address from './address.js'

/**
 * @description Registra una nueva Entidad en la BD, tiene valores por defecto para que no de errores en la feria
 * @param {*} db 
 * @param {*} req 
 * @returns Devuelve -1 en caso de error o el id_Entity de la Entidad creada
 */
export async function createNewEntity(db, req) {
	var id_role = utilities.getNumber(req.body.id_role) === -1 ? 2 : req.body.id_role
	var phone = utilities.getNumber(req.body.phone) === -1 ? 600000000 : req.body.phone
	var nick = utilities.isEmpty(req.body.nick) ? 'FeriaPIN2021' : req.body.nick
	var surname = utilities.isEmpty(req.body.surname) ? 'null' : req.body.surname
	var description = utilities.isEmpty(req.body.description) ? 'FeriaPIN2021' : req.body.description
	var avatar = utilities.isEmpty(req.body.avatar) ? 'https://res.cloudinary.com/wannahangout2021/image/upload/v1639329249/FeriaPIN2021/Avatar/bgpkh3ldbywnyquoyr0h.webp' : req.body.avatar

	if (utilities.isEmpty(req.body.name)) {
		return 'Formato incorrecto de: "Nombre".'
	} else if (utilities.isEmpty(req.body.mail)) {
		return 'Formato incorrecto de: "Correo Electrónico".'
	} else if (utilities.isEmpty(req.body.pass)) {
		return 'Formato incorrecto de: "password".'
	}

	var id_address = await address.createNewAddress(db, req)
	if (id_address === -1){
		return 'Error: NO se ha podido insertar Dirección'
	}

	var sql = 'INSERT INTO entity ('
	sql += 'id_role, id_address, nick, name, surname, description, mail, sha256, phone, pass, avatar) VALUES ('
	sql += id_role + ', '
	sql += id_address + ', '
	sql += '"' + nick + '", '
	sql += '"' + req.body.name + '", '
	sql += '"' + surname + '", '
	sql += '"' + description + '", '
	sql += '"' + req.body.mail + '", '
	sql += '"' + utilities.sha256(req.body.mail) + '", '
	sql += phone + ', '
	sql += '"' + utilities.sha256(req.body.pass) + '", '
	sql += '"' + avatar  + '"'
	sql += '); '

	//log(sql)
	var idEntityCreate = new Promise(resolve => {
		db.query(sql, (err, result) => {
			if (err) {
				console.log(err)
				resolve(-1)
			}
			resolve(result.insertId)
		})
	})

	if (!utilities.isEmpty(req.body.tags_ent)) {
		let arr = []
		for(let i of req.body.tags_ent) {
			arr.push(parseInt(i))
		}
		if (!query.queryInsertOneToMuch(db, await idEntityCreate, arr, 'tags_ent', 'id_entity', 'id_tags')) {
			return 'Error: NO se ha podido insertar Etiquetas'
		}
	}
	
	return JSON.stringify(await idEntityCreate)
}

/**
 * @description Actualiza los datos de una Entidad
 * @param {*} db 
 * @param {*} req 
 * @returns Devuelve false en caso de error true en caso contrario
 */
export async function updateEntity(db, req) {
	var id_entity = utilities.getNumber(req.body.id_entity)
	var id_role = utilities.getNumber(req.body.id_role)
	var phone = utilities.getNumber(req.body.phone)
	var deleted = utilities.getNumber(req.body.deleted)

	if (id_entity === -1){
		return 'Formato incorrecto de: "id_entity".'
	} else if (id_role === -1){
		return 'Formato incorrecto de: "Rol de usuario".'
	} else if (phone === -1){
		return 'Formato incorrecto de: "Teléfono de contacto".'
	} else if (deleted === -1){
		return 'Formato incorrecto de: "Marcado para borrar".'
	}  else if (utilities.isEmpty(req.body.nick)) {
		return 'Formato incorrecto de: "Nick".'
	} else if (utilities.isEmpty(req.body.name)) {
		return 'Formato incorrecto de: "Nombre".'
	} else if (utilities.isEmpty(req.body.description)) {
		return 'Formato incorrecto de: "Aficciones del Usuario".'
	} else if (utilities.isEmpty(req.body.mail)) {
		return 'Formato incorrecto de: "Correo Electrónico".'
	} else if (utilities.isEmpty(req.body.avatar)) {
		return 'Formato incorrecto de: "avatar".'
	}

	if (!address.updateAddress(db, req)){
		return 'Error: NO se ha podido actualizar la Dirección'
	}
	
	if (!utilities.isEmpty(req.body.tags_ent)) {
		if (!query.deleteSimpleFromTable(db, id_entity, 'tags_ent', 'id_entity')) {
			return 'Error: NO se ha podido eliminar Etiquetas'
		}
		let arr = []
		for(let i of req.body.tags_ent) {
			arr.push(parseInt(i))
		}
		if (!query.queryInsertOneToMuch(db, id_entity, arr, 'tags_ent', 'id_entity', 'id_tags')) {
			return 'Error: NO se ha podido insertar Etiquetas'
		}
	}

	var sql = 'UPDATE entity SET '
	sql += 'id_role = ' + id_role + ', '
	sql += 'nick = "' + req.body.nick + '", '
	sql += 'name = "' + req.body.name + '", '
	sql += 'surname = "' + req.body.name + '", '
	sql += 'description = "' + req.body.description + '", '
	sql += 'mail = "' + req.body.mail + '", '
	sql += 'sha256 = "' + utilities.sha256(req.body.mail) + '", '
	if (!utilities.isEmpty(req.body.pass)) {
		sql += 'pass = "' + utilities.sha256(req.body.pass) + '", '
	}
	sql += 'phone = ' + phone + ', '
	sql += 'avatar = "' + req.body.avatar + '", '
	sql += 'deleted = ' + deleted + ' '
	sql += 'WHERE id_entity = ' + id_entity + '; '

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
 * @description Comprueba las credenciales de una entidad, es decir, si mail y pass están registrados
 * @param {*} db 
 * @param {*} req 
 * @returns 
 */
export async function isEntityRegistred(db, req){
	if (utilities.isEmpty(req.body.mail)) {
		return 'Formato incorrecto de: "mail".'
	} else if (utilities.isEmpty(req.body.pass)) {
		return 'Formato incorrecto de: "pass".'
	}
	return await query.isInDatabase(db, 'nick', 'entity', 'sha256 = "' + req.body.mail + '" AND pass = "' + req.body.pass + '"')
}

export async function existNick(db, req){
	if (utilities.isEmpty(req.body.nick)) {
		return 'Formato incorrecto de: "nick".'
	}
	return await query.isInDatabase(db, 'nick', 'entity', 'nick = "' + req.body.nick + '"')
}

/**
 * @description Marca como borrada una entity
 * @param {*} db 
 * @param {*} id_entity 
 * @returns Devuelve false en caso de error true en caso contrario
 */
export async function deleteEntityById(db, id_entity) {

	var sql = 'UPDATE entity SET '
	sql += 'deleted = ' + 1 + ' '
	sql += 'WHERE id_entity = ' + id_entity + '; '

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
 * @description Devuelve un JSON sin filtrar, con todas las Entities NO BORRADAS
 * @param {*} db
 * @returns JSON
 */
export async function getAllEntities(db, listAll) {
	var sql = sqlBodyQueryGetEntity() + 'WHERE deleted = ' + 0
	if (listAll > 0 ) {
		sql = sqlBodyQueryGetEntity()
	}
	return new Promise(resolve => {
		db.query(sql, (err, result) => {
			if (err) {
				console.log(err)
			}
			resolve(result)
		})
	})
}

/**
 * @description Devuelve una entidad dado el id de dicha entidad
 * @param {*} db Base de Datos de consulta
 * @param {*} activityID id a consultar
 * @returns JSON con los siguientes datos {
 */
export async function getEntityByID(db, entityID) {
	if ((await query.getMaxIdFromTable(db, 'entity')) < entityID || entityID < 1) {
		return 'Este id no pertenece a ninguna entidad'
	}
	if(await query.isDeleted(db, 'entity', 'id_entity', entityID)) {
		return ('Este id fue borrado de la BD')
	}
	log(sqlBodyQueryGetEntity() + 'WHERE id_entity = ' + entityID)
	return new Promise(resolve => {
		db.query(sqlBodyQueryGetEntity() + 'WHERE id_entity = ' + entityID, (err, result) => {
			if (err) {
				console.log(err)
			}
			//log(result[0])
			resolve(result && result[0])
		})
	})
}

export async function getEntityByHash(db, entityHash) {
	return new Promise(resolve => {
		db.query(sqlBodyQueryGetEntity() + 'WHERE sha256 = "' + entityHash + '"', (err, result) => {
			if (err) {
				console.log(err)
			}
			resolve(result && result[0])
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
