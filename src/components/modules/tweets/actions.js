import moment from 'moment';
import { v4 as uuid } from 'uuid';

const scope = '@@tweets';

export const CREATE_TWEET = `${scope}/CREATE_TWEET`;

export const createTweet = payload => ({
  type: CREATE_TWEET,
  payload: {
    id: uuid(), // unique id of tweet
    createdAt: moment(), // datetime object of tweet's creation
    userId: null, // user's id
    text: '', // content of the tweet
    replyToId: null, // if the tweet is a reply, id to the original tweet
    ...payload,
  },
});
