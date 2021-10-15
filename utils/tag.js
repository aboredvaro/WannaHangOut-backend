import log from '../system/log.js'
import db from '../system/connection.js'

const getAllTags = () => {
	db.query('SELECT * FROM tags', (err, result) => {
		if (err) {
			console.log(err)
		}
		log(result)
		return result
	})
	
}
export default {getAllTags}