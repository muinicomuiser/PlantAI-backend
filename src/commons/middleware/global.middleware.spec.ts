import { GlobalMiddleware } from '../../middleware-global/global.middleware';

describe('GlobalMiddleware', () => {
  it('should be defined', () => {
    expect(new GlobalMiddleware()).toBeDefined();
  });
});
