import { BadRequest } from './bad-request-error';

describe('BadRequest', () => {
  it('should create an instance', () => {
    expect(new BadRequest()).toBeTruthy();
  });
});
