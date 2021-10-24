import log from './log.js'
import * as utilities from './utilities.js'
import * as query from './query.js'

/**
 * @description Asocia para un mismo id (de entidad o de cliente, depende de la tabla) las tag correspondientes
 * @param {*} db Base de Datos
 * @param {*} tags Array con las Etiquetas
 * @param {*} id id_entity o id_activity
 * @param {*} table tags_ent o tags_act
 * @returns Devuelve true si la inserción es satisfactoria o false en caso contrario
 */
export async function insertTagsByIdOfEntitYOrActivity(db, tags, id, table, columna) {

	var sql = 'INSERT INTO ' + table + ' ('+ columna + ' , id_tags) VALUES ' 
	for (let i = 0; i < tags.length; i++) {
		sql += '(' + id + ', ' + tags[i] + '), '
	}
	sql = sql.substring(0, sql.length - 2) + ';'
	
	new Promise(resolve => {
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
 * @param {*} db 
 * @returns Devuelve todas las etiquetas disponibles
 */
export async function getAllTags(db) {
	return new Promise(resolve => {
		db.query('SELECT * FROM tags', (err, result) => {
			if (err) {
				console.log(err)
			}
			resolve(JSON.stringify(result))
		})
	})
	
}
