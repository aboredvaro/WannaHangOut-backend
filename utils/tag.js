import log from './log.js'

/**
 * @description Elimina los tags asociados a un id
 * @param {*} db Base de Datos
 * @param {*} id id_entity o id_activity
 * @param {*} table tags_ent o tags_act
 * @returns Devuelve true si la inserción es satisfactoria o false en caso contrario
 */
export async function deleteTagsByIdOfEntityOrActivity2(db, id, table, columna) {
	var sql = 'DELETE FROM ' + table + ' WHERE ' + columna + ' = ' + id + ';'
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
