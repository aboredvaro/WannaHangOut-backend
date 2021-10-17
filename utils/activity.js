export async function createNewActivity(db, params) {

	// To complete
	
}

/**
 * @description Devuelve todas las actividades
 * @param {*} db Base de Datos de consulta
 * @returns JSON con todas las actividades
 */
export async function getAllActivities(db) {

	return new Promise(resolve => {
		db.query('SELECT * FROM activity', (err, result) => {
			if (err) {
				console.log(err)
			}
			resolve(JSON.stringify(result))
		})
	})
	
}

/**
 * @description Devuelve una actividad dado el id de dicha actividad
 * @param {*} db Base de Datos de consulta
 * @param {*} activityID id a consultar
 * @returns JSON con los siguientes datos {"id_activity", "title", "description", "seats", 
 * 		  "price", "location", "dateAct", "min_duration", "id_entity_creador"}
 */
export async function getActivityByID(db, activityID) {

	// To complete
	// Return activity with given "activityID"
	
}

export async function filterActivitiesBy(db, params) {

	// To complete
	// Implemented in SQL
	// Return activity list filtered in SQL by "price", "duration", "date", "seats", "location", "type"
	// SQL Limit ("lowerLimit" y "upperLimit")
}

export async function sortActivitiesBy(db, params) {

	// To complete
	// Implemented in JS from JSON
	// Sorting: "price", "duration", "date", "seats", "type"
}
