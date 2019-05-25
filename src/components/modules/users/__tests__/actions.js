import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('uuid', () => ({
  v4: () => '<id>',
}));

describe('users actions', () => {
  it('exports constants', () => {
    expect(actions.RECIEVE_AUTH).toBeDefined();
    expect(actions.SIGNIN).toBeDefined();
    expect(actions.SIGNUP).toBeDefined();
    expect(actions.LOGIN).toBeDefined();
    expect(actions.LOGOUT).toBeDefined();
  });

  it('recieves auth', () => {
    expect(actions.recieveAuth()).toMatchSnapshot();
  });

  it('signs in', () => {
    const id = 123;
    expect(actions.signin(id)).toMatchSnapshot();
  });

  it('signs up', () => {
    const username = 'user';
    expect(actions.signup(username)).toMatchSnapshot();
  });

  it('logins new user', () => {
    const user = {
      id: '123',
      username: 'user',
    };

    const store = mockStore({
      users: {
        byId: {},
      },
    });

    store.dispatch(actions.login(user.username));

    expect(store.getActions()).toEqual([
      { type: actions.LOGIN, username: user.username },
      actions.signup(user.username),
    ]);
  });

  it('logins existing user', () => {
    const user = {
      id: '123',
      username: 'user',
    };

    const store = mockStore({
      users: {
        byId: {
          [user.id]: user,
        },
      },
    });

    store.dispatch(actions.login(user.username));

    expect(store.getActions()).toEqual([
      { type: actions.LOGIN, username: user.username },
      actions.signin(user.id),
    ]);
  });

  it('logouts', () => {
    expect(actions.logout()).toMatchSnapshot();
  });
});
