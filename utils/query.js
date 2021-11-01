import log from './log.js'

export async function getMaxIdFromTable(db, table) {

	var sql = 'SELECT COLUMN_NAME, COLUMN_KEY, DATA_TYPE ' 
	sql += 'FROM INFORMATION_SCHEMA.COLUMNS ' 
	sql += 'WHERE TABLE_NAME = "' + table + '" AND COLUMN_KEY IN ("PRI", "UNI");'

	var columnKey = new Promise(resolve => {
		db.query(sql, (err, result) => {
			if (err) {
				console.log(err)
			}
			resolve(result[0].COLUMN_NAME)
		})
	})

	sql = 'SELECT MAX(' + await columnKey + ') AS max FROM ' + table
	return new Promise(resolve => {
		db.query(sql, (err, result) => {
			if (err) {
				console.log(err)
			}
			resolve(result[0].max)
		})
	})
}

/**
 * @description Genera el string correspondiente a una consulta SQL 
 *      		para insertar datos en una tabla con relación UNO A MUCHOS
 * @param {*} oneId ID que no cambia
 * @param {*} muchId ID que cambia
 * @param {*} table nombre de la tabla
 * @param {*} nameColunmOne nombre de la columna del elemento que no cambia
 * @param {*} nameColumnMuch nombre de la columna del elemento que cambia
 * @returns devuelve un string con la consulta INSERT creada, lista para usar en la query
 */
function stringInsertQueryOneToMuch(oneId, muchId, table, nameColunmOne, nameColumnMuch) {

	var sql = 'INSERT INTO ' + table + ' ('+ nameColunmOne + ' , ' + nameColumnMuch + ') VALUES ' 
	for (let i = 0; i < muchId.length; i++) {
		sql += '(' + oneId + ', ' + muchId[i] + '), '
	}
	return sql.substring(0, sql.length - 2) + ';'
}

/**
 * @description Ejecuta la consulta SQL para insertar datos en una tabla 
 *              con relación UNO A MUCHOS
 * @param {*} db Base de Datos
 * @param {*} oneId ID que no cambia
 * @param {*} muchId ID que cambia
 * @param {*} table nombre de la tabla
 * @param {*} nameColunmOne nombre de la columna del elemento que no cambia
 * @param {*} nameColumnMuch nombre de la columna del elemento que cambia
 * @returns Devuelve true si la inserción es satisfactoria o false en caso contrario
 */
export async function queryInsertOneToMuch(db, oneId, muchId, table, nameColunmOne, nameColumnMuch) {
	return new Promise(resolve => {
		db.query(stringInsertQueryOneToMuch(oneId, muchId, table, nameColunmOne, nameColumnMuch), (err) => {
			if (err) {
				console.log(err)
				resolve(false)
			}
			resolve(true)
		})
	})
}

/**
 * @description Elimina todas las filas de una tabla que cumplan que 
 *  			el id está contenido en la columna dada
 * @param {*} db Base de Datos
 * @param {*} id condición que debe cumplir
 * @param {*} table tabla de donde se borrarán los datos
 * @param {*} columna nombre de la columna que servirá de comparador
 * @returns Devuelve true si la inserción es satisfactoria o false en caso contrario
 */
export async function deleteSimpleFromTable(db, id, table, columna) {
	var sql = 'DELETE FROM ' + table + 'WHERE ' + columna + ' = ' + id + ';'
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