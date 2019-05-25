import reducer, {
  initialState,
  allIds,
  byId,
  getTweetById,
  getAllTweets,
  getRepliesById,
} from '../reducer';
import * as actions from '../actions';

jest.mock('uuid', () => ({
  v4: () => '<id>',
}));

jest.mock('moment', () => () => '<datetime>');

describe('tweets reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
    expect(allIds(undefined, {})).toEqual(initialState.allIds);
    expect(byId(undefined, {})).toEqual(initialState.byId);
  });

  it('create new tweet', () => {
    const payload = { text: 'Test tweet' };
    const state = reducer(initialState, actions.createTweet(payload));
    expect(state).toMatchSnapshot();
  });
});

describe('tweets selectors', () => {
  it('gets tweets by id', () => {
    const user = { id: 123, username: 'user' };
    const state = {
      byId: {
        [user.id]: user,
      },
    };

    expect(getTweetById(state, user.id)).toEqual(user);
    expect(getTweetById(state, 321)).toBeUndefined();
  });

  it('gets all tweets', () => {
    const tweet1 = { id: 1, text: 'tweet 1' };
    const tweet2 = { id: 2, text: 'tweet 2' };
    const state = {
      allIds: [tweet1.id, tweet2.id],
      byId: {
        [tweet1.id]: tweet1,
        [tweet2.id]: tweet2,
      },
    };

    expect(getAllTweets(state)).toEqual([tweet1, tweet2]);
  });

  it('gets replies by id', () => {
    const tweet = { id: 1, text: 'tweet 1' };
    const reply = { id: 2, text: 'tweet 2', replyToId: 1 };
    const state = {
      allIds: [tweet.id, reply.id],
      byId: {
        [tweet.id]: tweet,
        [reply.id]: reply,
      },
    };

    expect(getRepliesById(state, tweet.id)).toEqual([reply]);
  });
});
