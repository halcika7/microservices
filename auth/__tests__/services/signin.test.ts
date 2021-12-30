import { SignInService } from '@service/signin.service';

describe('Testing SignIn service', () => {
  it('Same instance', () => {
    const i1 = SignInService.instance;
    const i2 = SignInService.instance;

    expect(i1).toEqual(i2);
  });
});
