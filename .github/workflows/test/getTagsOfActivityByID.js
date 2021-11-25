async function getTagsOfActivityByID() {
	return await fetch(`https://wannahangout-server-beta.herokuapp.com/api/getTagsOfActivityByID?id_activity=1`).then(resolve => resolve.json)
}

module.exports = getTagsOfActivityByID;