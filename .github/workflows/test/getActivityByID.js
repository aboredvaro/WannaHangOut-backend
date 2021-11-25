async function getActivityByID() {
	return await fetch(`https://wannahangout-server-beta.herokuapp.com/api/getActivityByID?id_activity=1`).then(resolve => resolve.json)
}

module.exports = getActivityByID;