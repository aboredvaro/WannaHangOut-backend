import log from './log.js'
import * as utilities from './utilities.js'

/**
 * @description Registra una nueva Imagen en la BD
 * @param {*} db 
 * @param {*} req 
 * @returns Devuelve -1 en caso de error o el id_image de la imagen creada
 */
export async function createNewImage(db, req) {

	if (utilities.isEmpty(req.body.urlPath)) {
		return 'Formato incorrecto de: "url de imagen".'
	}

	var sql = 'INSERT INTO images ('
	sql += 'urlPath) VALUES ('
	sql += '"' + req.body.urlPath + '", '
	sql += '); '

	return new Promise(resolve => {
		db.query(sql, (err, result) => {
			if (err) {
				console.log(err)
				resolve(JSON.stringify(-1))
			}
			resolve(result.insertId)
		})
	})
}