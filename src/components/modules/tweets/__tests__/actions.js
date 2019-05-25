import * as actions from '../actions';

jest.mock('uuid', () => ({
  v4: () => '<id>',
}));

jest.mock('moment', () => () => '<datetime>');

describe('tweets actions', () => {
  it('exports constants', () => {
    expect(actions.CREATE_TWEET).toBeDefined;
  });

  it('creates tweet', () => {
    const tweet = actions.createTweet({
      text: 'Test tweet',
    });

    expect(tweet).toMatchSnapshot();
  });
});
