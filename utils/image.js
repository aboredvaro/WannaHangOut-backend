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

	var sql = 'INSERT INTO images (urlPath) VALUES ('
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

/**
 * @param {*} db			Base de datos donde se hace la consulta 
 * @param {*} req.body.id 	Id a consultar
 * @param {*} req.body.type 	typo a consultar, type=1 para tags de entidad, type=2 para tags de actividad
 * @returns 				JSON con los siguientes datos {id_tags, name, id}
 */
export async function getImageByIdAndType(db, id_object, type) {

	var select = 'SELECT i.id_image, i.urlPath, '
	var from = 'FROM images i, '
	var where = 'WHERE img.id_image = i.id_image AND img.deleted = 0 '

	switch (type) {
	case 1:
		select += 'img.id_activity '
		from += 'img_act img '
		where += 'AND id_activity = ' + id_object + ' '
		break
	case 2:
		select += 'img.id_review '
		from += 'img_review img '
		where += 'AND id_review = ' + id_object + ' '
		break
	default:
		return '"type fuera de rango".'
	}
	where += ';'
	var sql = select + from + where
	//log(sql)
	return new Promise(resolve => {
		db.query(sql, (err, result) => {
			if (err) {
				console.log(err)
			}
			resolve(result)
		})
	})
	
}