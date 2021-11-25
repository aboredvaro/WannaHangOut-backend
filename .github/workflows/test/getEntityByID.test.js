const getEntityByID = require('./getEntityByID');

test('Test getEntityByID para id_entity=1', () => {
  expect(getEntityByID()).resolves.toEqual({
    "avatar": "https://www.caritas.org.mx/wp-content/uploads/2019/02/cualidades-persona-humanitaria.jpg",
    "deleted": 0,
    "description": "Crecer es cambiar",
    "id_address": 1,
    "id_entity": 1,
    "id_role": 2,
    "mail": "ddt@got.com",
    "name": "Daenerys",
    "nick": "Dracarys",
    "phone": 999555111,
    "surname": "Targaryen"
  });
});
