import log from './log.js'
import * as utilities from './utilities.js'
import * as query from './query.js'

/**
 * @description Registra una nueva Dirección en la BD
 * @param {*} db 
 * @param {*} req 
 * @returns Devuelve -1 en caso de error o el id_Address de la Actividad creada
 */
export async function createNewAddress(db, req) {
	var codPos = utilities.getNumber(req.body.codPos)
	var latitude = utilities.getNumberFloat(req.body.latitude)
	var longitude = utilities.getNumberFloat(req.body.longitude)

	if (codPos === -1){
		return 'Formato incorrecto de: "Código Postal".'
	} else if (latitude === -1) {
		return 'Formato incorrecto de: "Latitud".'
	} else if (longitude === -1) {
		return 'Formato incorrecto de: "Longitud".'
	}else if (utilities.isEmpty(req.body.location)) {
		return 'Formato incorrecto de: "Localidad".'
	} else if (utilities.isEmpty(req.body.direction)) {
		return 'Formato incorrecto de: "Dirección".'
	}

	var id_province = Math.trunc(codPos/1000)
	
	// Crear la consulta
	var sql = 'INSERT INTO address (id_province, codPos, location, direction, latitude, longitude) VALUES ( '
	sql += id_province + ', '
	sql += codPos + ', '
	sql += '"' + req.body.location + '", '
	sql += '"' + req.body.direction + '", '
	sql += latitude + ', '
	sql += longitude
	sql += '); '

	//log(sql)
	return new Promise(resolve => {
		db.query(sql, (err, result) => {
			if (err) {
				console.log(err)
				resolve(JSON.stringify(-1))
			}
			resolve(JSON.stringify(result.insertId))
		})
	})
}

/**
 * @description  Actualiza los datos de una Dirección
 * @param {*} db 
 * @param {*} req 
 * @returns Devuelve false en caso de error true en caso contrario
 */
export async function updateAddress(db, req) {
	var id_address = utilities.getNumber(req.body.id_address)
	var codPos = utilities.getNumber(req.body.codPos)
	var latitude = utilities.getNumberFloat(req.body.latitude)
	var longitude = utilities.getNumberFloat(req.body.longitude)

	if (id_address === -1){
		return 'Formato incorrecto de: "id_address".'
	} else if (codPos === -1){
		return 'Formato incorrecto de: "Código Postal".'
	} else if (latitude === -1) {
		return 'Formato incorrecto de: "Latitud".'
	} else if (longitude === -1) {
		return 'Formato incorrecto de: "Longitud".'
	}else if (utilities.isEmpty(req.body.location)) {
		return 'Formato incorrecto de: "Localidad".'
	} else if (utilities.isEmpty(req.body.direction)) {
		return 'Formato incorrecto de: "Dirección".'
	}

	var id_province = Math.trunc(codPos/1000)

	var sql = 'UPDATE address SET '
	sql += 'id_province = ' + id_province + ', '
	sql += 'codpos = ' + codPos + ', '
	sql += 'location = "' + req.body.location + '", '
	sql += 'direction = "' + req.body.direction + '", '
	sql += 'latitude = ' + latitude + ', '
	sql += 'longitude = ' + longitude + ' '
	sql += 'WHERE id_address = ' + id_address + '; '
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
 * @description Devuelve una dirección dado el id de dicha dirección
 * @param {*} db Base de Datos de consulta
 * @param {*} addressID id a consultar
 * @returns JSON con los siguientes datos {"id_address", "province", "codPos", "location",
 * 				  "direction", latitude", longitude"}
 */
export async function getAddressByID(db, addressID) {
	if ((await query.getMaxIdFromTable(db, 'address')) < addressID || addressID < 1) {
		return 'id fuera de rango'
	}
	var sqlSelect = 'SELECT a.id_address, p.province, a.codPos, a.location, a.direction, a.latitude, a.longitude '
	var sqlFrom = 'FROM address a, provinces p '
	var sqlWhere = 'WHERE a.id_province = p.id_province AND a.id_address = ' + addressID + '; '

	return new Promise(resolve => {
		db.query(sqlSelect + sqlFrom + sqlWhere, (err, result) => {
			if (err) {
				console.log(err)
			}
			resolve(result[0])
		})
	})
}