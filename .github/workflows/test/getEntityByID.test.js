import getEntityByID from '../../../utils/entity'
import db from '../../../index'

test('Test entidad #1', () => {
  expect(getEntityByID(db, 12)).toBe({});
});