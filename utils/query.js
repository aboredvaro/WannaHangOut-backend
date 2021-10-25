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
 * @description Prepara una consulta SQL para insertar en una tabla con relación UNO A MUCHOS
 * @param {*} oneId ID que se repite
 * @param {*} muchId ID que varia
 * @param {*} table nombre de la tabla
 * @param {*} nameColunmOne nombre de la columna del elemento que no cambia
 * @param {*} nameColumnMuch nombre de la columna del elemento que cambia
 * @returns devuelve un string con la consulta INSERT creada, lista para usar en la query
 */
async function stringQueryOneToMuch(oneId, muchId, table, nameColunmOne, nameColumnMuch) {

	var sql = 'INSERT INTO ' + table + ' ('+ nameColunmOne + ' , ' + nameColumnMuch + ') VALUES ' 
	for (let i = 0; i < muchId.length; i++) {
		sql += '(' + oneId + ', ' + muchId[i] + '), '
	}
	return sql.substring(0, sql.length - 2) + ';'
}

/**
 * @description Hace una consulta SQL para insertar en una tabla con relación UNO A MUCHOS
 * @param {*} db Base de Datos
 * @param {*} muchId ID que varia
 * @param {*} table nombre de la tabla
 * @param {*} nameColunmOne nombre de la columna del elemento que no cambia
 * @param {*} nameColumnMuch nombre de la columna del elemento que cambia
 * @returns Devuelve true si la inserción es satisfactoria o false en caso contrario
 */
export async function queryOneToMuch(db, oneId, muchId, table, nameColunmOne, nameColumnMuch) {
	return new Promise(resolve => {
		db.query(stringQueryOneToMuch(oneId, muchId, table, nameColunmOne, nameColumnMuch), (err) => {
			if (err) {
				console.log(err)
				resolve(false)
			}
			resolve(true)
		})
	})

}