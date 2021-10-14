import log from './log.js'
import mysql from 'mysql'

const getAllTags = (db) => {
	db.getConnection()
	db.query('SELECT * FROM tags', (err, result) => {
		if (err) {
			console.log(err)
		}
		return result
	})
}
export default getAllTags