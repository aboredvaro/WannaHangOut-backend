const getTagsOfActivityByID = require('./getTagsOfActivityByID');

test('Test getTagsOfActivityByID para id_activity=1', () => {
  expect(getTagsOfActivityByID()).resolves.toEqual([
    {"id_tags":1,"name":"Aire libre"},
    {"id_tags":2,"name":"Deportes"},
    {"id_tags":3,"name":"Gastronomía"},
    {"id_tags":4,"name":"Hacer Deporte"},
    {"id_tags":5,"name":"Playa"},
    {"id_tags":7,"name":"Salir de fiesta"}
  ]);
});
