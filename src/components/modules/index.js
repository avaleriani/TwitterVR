import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from '../utils/history';

import users, * as fromUsers from './users';
import tweets, * as fromTweets from './tweets';

export const rootReducer = combineReducers({
  users,
  tweets,
});

export default connectRouter(history)(rootReducer);

export const getTweetMeta = (state, tweet) => {
  const repliedTweet = fromTweets.getTweetById(state.tweets, tweet.replyToId);
  const user = fromUsers.getUserById(state.users, tweet.userId);
  return { ...tweet, repliedTweet, user };
};
