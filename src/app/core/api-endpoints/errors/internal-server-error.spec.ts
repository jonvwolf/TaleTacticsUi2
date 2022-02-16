import { InternalServerError } from './internal-server-error';

describe('InternalServerError', () => {
  it('should create an instance', () => {
    expect(new InternalServerError()).toBeTruthy();
  });
});
