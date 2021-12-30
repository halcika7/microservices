import { transformMultipartData } from '../../src';

test('Transform multipart helper', () => {
  const data = transformMultipartData({ age: '1', name: 'name' });
  expect(data.age).toEqual(1);
});
