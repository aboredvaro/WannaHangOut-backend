import log from './log.js'
import mysql from 'mysql'

const getAllTags1 = async(db) => {
	db.query('SELECT * FROM tags', (err, result) => {
		if (err) {
			console.log(err)
		}
		return result
	})
	
}

const getAllTags = async(db) =>{
	let v
	try {
	  v = await consultita(db,'SELECT * FROM tags')
	  log(v)
	} catch(e) {console.log(e)}
	return JSON.stringify(v)
}

function consultita(db, consulta){
	db.query(consulta, (err, result) => {
		if (err) {
			console.log(err)
		}
		return result
	})
}

export default {getAllTags, getAllTags1}