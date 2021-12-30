import { Hash } from '@lib/hash';

describe('Testing hash utility class', () => {
  it('return true', async () => {
    const hash = await Hash.hash('haris');

    const isEqual = await Hash.compare(hash, 'haris');

    expect(isEqual).toBeTruthy();
  });

  it('return false', async () => {
    const hash = await Hash.hash('haris');

    const isEqual = await Hash.compare(hash, 'huihu');

    expect(isEqual).toBeFalsy();
  });
});
