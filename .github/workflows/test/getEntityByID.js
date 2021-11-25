async function getEntityByID() {
	return await fetch(`https://wannahangout-server-beta.herokuapp.com/api/getEntityByID?id_entity=1`).then(resolve => resolve.json)
}

module.exports = getEntityByID;