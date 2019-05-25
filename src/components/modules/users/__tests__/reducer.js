import reducer, {
  initialState,
  active,
  allIds,
  byId,
  isAuthenticated,
  getUserById,
  getUserIdByUsername,
} from '../reducer';
import * as actions from '../actions';

jest.mock('uuid', () => ({
  v4: () => '<id>',
}));

describe('tweets reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
    expect(active(undefined, {})).toEqual(initialState.active);
    expect(allIds(undefined, {})).toEqual(initialState.allIds);
    expect(byId(undefined, {})).toEqual(initialState.byId);
  });

  it('signups', () => {
    const action = actions.signup('user');
    const state = reducer(initialState, action);
    expect(state).toMatchSnapshot();
  });

  it('signins', () => {
    const action = actions.signin('123');
    const state = reducer(initialState, action);
    expect(state).toMatchSnapshot();
  });

  it('logouts', () => {
    const action = actions.logout();
    const state = reducer(
      {
        ...initialState,
        active: { username: 'active user' },
      },
      action,
    );
    expect(state).toMatchSnapshot();
  });
});

describe('users selectors', () => {
  it('returns active user', () => {
    const user = { id: '123', username: 'user' };

    expect(isAuthenticated({ active: user })).toEqual(true);
    expect(isAuthenticated({ active: null })).toEqual(false);
  });

  it('gets user by id', () => {
    const user = { id: '123', username: 'user' };
    const state = {
      byId: {
        [user.id]: user,
      },
    };

    expect(getUserById(state, user.id)).toEqual(user);
  });

  it('gets user id by username', () => {
    const user = { id: '123', username: 'user' };
    const state = {
      byId: {
        [user.id]: user,
      },
    };

    expect(getUserIdByUsername(state, user.username)).toEqual(user.id);
  });
});
