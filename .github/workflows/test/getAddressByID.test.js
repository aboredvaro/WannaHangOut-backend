const getAddressByID = require('./getAddressByID');

test('Test getAddressByID para id_address=1', () => {
  expect(getAddressByID()).resolves.toEqual({
    "id_address": 1,
    "province": "Córdoba",
    "codPos": 14200,
    "location": "Peñarroya-Pueblonuevo",
    "direction": "C/ Dos de mayo, 22",
    "latitude": 39.08989925,
    "longitude": -0.545081986577831
  });
});
