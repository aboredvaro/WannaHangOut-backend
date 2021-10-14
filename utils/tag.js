import log from './log.js'

const getAllTags = async(db) => {
	db.query('SELECT * FROM tags', (err, result) => {
		if (err) {
			console.log(err)
		}
		log('-> Llamada ha llegado a tags.js')
		log(JSON.stringify(result))
		return result
	})
}

export default getAllTags