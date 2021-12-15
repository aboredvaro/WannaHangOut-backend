import log from './log.js'
import * as utilities from './utilities.js'

/**
 * @param {*} db 
 * @returns Devuelve todas las etiquetas disponibles
 */
export async function getAllTags(db) {
	return new Promise(resolve => {
		db.query('SELECT * FROM tags', (err, result) => {
			if (err) {
				console.log(err)
			}
			resolve(result)
		})
	})
}

/**
 * @param {*} db			Base de datos donde se hace la consulta 
 * @param {*} req.body.id 	Id a consultar
 * @param {*} req.body.type 	typo a consultar, type=1 para tags de entidad, type=2 para tags de actividad
 * @returns 				JSON con los siguientes datos {id_tags, name, id}
 */
export async function getTagsByIdAndType(db, req) {
	var id_object = utilities.getNumber(req.body.id)
	var type = utilities.getNumber(req.body.type)
/*
	if (id_object === -1){
		return 'Formato incorrecto de: "id".'
	} else if (type === -1){
		return 'Formato incorrecto de: "type".'
	}
*/
	var select = 'SELECT * '
	var from = 'FROM tags t, '
	var where = 'WHERE ta.id_tags = t.id_tags '

	switch (type) {
	case 1:
		from += 'tags_ent ta '
		where += 'AND id_entity = ' + id_object + ' '
		break
	case 2:
		from += 'tags_act ta '
		where += 'AND id_activity = ' + id_object + ' '
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
