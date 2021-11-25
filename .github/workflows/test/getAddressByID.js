async function getAddressByID() {
	return await fetch(`https://wannahangout-server-beta.herokuapp.com/api/getAddressByID?id_address=1`).then(resolve => resolve.json)
}

module.exports = getAddressByID;