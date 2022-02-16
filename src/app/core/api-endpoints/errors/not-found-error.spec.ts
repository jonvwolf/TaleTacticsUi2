import { NotFound } from './not-found-error';

describe('NotFound', () => {
  it('should create an instance', () => {
    expect(new NotFound()).toBeTruthy();
  });
});
