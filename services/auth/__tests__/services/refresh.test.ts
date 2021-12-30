import { RefreshService } from '@service/refresh.service';

describe('Testing Refresh service', () => {
  it('Same instance', () => {
    const i1 = RefreshService.instance;
    const i2 = RefreshService.instance;

    expect(i1).toEqual(i2);
  });
});
