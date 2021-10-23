import log from './log.js'
import * as utilities from './utilities.js'
import * as query from './query.js'

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

	log(sqlSelect + sqlFrom + sqlWhere)
	return new Promise(resolve => {
		db.query(sqlSelect + sqlFrom + sqlWhere, (err, result) => {
			if (err) {
				console.log(err)
			}
			resolve(result[0])
		})
	})

export async function createNewAddress(db, req) {
	var sqlInsert = 'INSERT INTO address ( id_province, codPos, location, direction, latitude, longitude) VALUES ( '
	sqlInsert += parseInt(req.query.id_province) + ', '
	sqlInsert += parseInt(req.query.codPos) + ', '
	sqlInsert += req.query.location + ', '
	sqlInsert += req.query.direction + ', '
	sqlInsert += parseInt(req.query.latitude) + ', '
	sqlInsert += parseInt(req.query.longitude) + ')'

	log(sqlInsert)
	var idAddressCreated = new Promise(resolve => {
		db.query(sqlInsert, (err, result) => {
			if (err) {
				console.log(err)
			}
			resolve(JSON.stringify(result.insertId))
		})
	})	
    return idAddressCreated
}