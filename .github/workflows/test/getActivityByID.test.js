const getActivityByID = require('./getActivityByID');

test('Test getActivityByID para id_activity=1', () => {
  expect(getActivityByID()).resolves.toEqual({
    "id_activity": 1,
    "id_entity_creator": 2,
    "id_address": 16,
    "title": "Party de Halloween",
    "description": "Nos vamos de botellona por el centro...",
    "seats": 155,
    "price": 12.5,
    "dateAct": "2021-11-30T00:00:00.000Z",
    "min_duration": 15,
    "deleted": 0
  });
});
