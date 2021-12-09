import log from './log.js'
import * as activity from './activity.js'

export async function setEntityToActivity(db, id_entity, id_activity) {
	// Comprobar que si ya está apuntado
	if(await isEntityInActivity(db, id_entity, id_activity)){
		return 'El usuario ya está inscrito en esta actividad'
	}
	// Comprobar que hoy() <= dateAct
	if(await activity.isActivityDeprecated(db, id_activity)){
		return 'La fecha de la actividad está en el pasado'
	}
	// Comprobar si activity está deleted
	if(await activity.isActivityDeprecated(db, id_activity)){
		return 'La actividad ya no está disponible'
	}
	// Comprobar que hay plazas suficientes
	if(await activity.getSeatAvailables(db, id_activity) === 0 ){
		return 'La actividad no tiene plazas disponibles'
	}
	// Registrarme
	var sql = 'INSERT INTO entityToActivity ('
	sql += 'id_entity, id_activity) VALUES ('
	sql += id_entity + ', '
	sql += id_activity
	sql += '); '
	return Promise(resolve => {
		db.query(sql, (err, result) => {
			if (err) {
				console.log(err)
				resolve(JSON.stringify(-1))
			}
			resolve(result.insertId)
		})
	})
}

export async function deleteEntityToActivity(db, id_entity, id_activity) {
	// Comprobar que si ya está borrado
	if(! await isEntityInActivity(db, id_entity, id_activity)){
		return 'El usuario ya está inscrito en esta actividad'
	}
	// Comprobar que hoy() <= dateAct
	if(await activity.isActivityDeprecated(db, id_activity)){
		return 'La fecha de la actividad está en el pasado'
	}
	// Comprobar si activity está deleted
	if(await activity.isActivityDeprecated(db, id_activity)){
		return 'La actividad ya no está disponible'
	}
	// Borrarme
	var sql = 'DELETE FROM entityToActivity '
	sql += 'WHERE id_entity = ' + id_entity + 'AND id_activity = ' + id_activity + '; '
	return Promise(resolve => {
		db.query(sql, (err, result) => {
			if (err) {
				console.log(err)
				resolve(JSON.stringify(-1))
			}
			resolve(result)
		})
	})
}

async function isEntityInActivity(db, id_entity, id_activity) {
	var sql = 'SELECT COUNT(*) AS cnt '
	sql += 'FROM entityToActivity '
	sql += 'WHERE id_entity = ' + id_entity + ' AND id_activity = ' + id_activity + '; '

	var cnt = new Promise(resolve => {
		db.query(sql, (err, result) => {
			if (err) {
				console.log(err)
				resolve(-1)
			}
			resolve(result.cnt)
		})
	})
	if (cnt === 1) return true
	return false
}