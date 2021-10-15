async function getAllTags(db) {

	return new Promise(resolve => {
		db.query('SELECT * FROM tags', (err, result) => {
			if (err) {
				console.log(err)
			}
			resolve(JSON.stringify(result))
		})
	})
	
}
export default getAllTags