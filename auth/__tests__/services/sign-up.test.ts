import { SignupService } from '@service/signup.service';

describe('Testing SignUp service', () => {
  it('Same instance', () => {
    const i1 = SignupService.instance;
    const i2 = SignupService.instance;

    expect(i1).toEqual(i2);
  });
});
