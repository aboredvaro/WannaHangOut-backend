async function getAllEntities(db) {

	return new Promise(resolve => {
		db.query('SELECT * FROM entity', (err, result) => {
			if (err) {
				console.log(err)
			}
			resolve(JSON.stringify(result))
		})
	})
	
}
export default getAllEntities