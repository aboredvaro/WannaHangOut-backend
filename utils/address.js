import log from './log.js'
import * as query from './query.js'

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