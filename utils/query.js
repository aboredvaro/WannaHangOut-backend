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