import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getUserById } from '../../modules/users';
import {
  createTweet,
  getTweetById,
  getRepliesById,
} from '../../modules/tweets';
import { getTweetMeta } from '../../modules';
import TweetInput from '../../components/TweetInput';
import Tweet from '../../components/Tweet';
import Timeline from '../../components/Timeline';

export class TweetPage extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        tweetId: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    activeUser: PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }),
    tweet: PropTypes.object.isRequired,
    replies: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    createTweet: PropTypes.func.isRequired,
  };

  onSubmit = text => {
    const {
      match: { params },
      activeUser,
      createTweet,
    } = this.props;

    createTweet({
      userId: activeUser.id,
      replyToId: params.tweetId,
      text,
    });
  };

  render() {
    const { tweet, replies, activeUser } = this.props;
    const hasReplies = replies.length > 0;

    if (!tweet) {
      return <Redirect to="/404" />;
    }

    return (
      <React.Fragment>
        <Tweet {...tweet} highlighted />
        {hasReplies && (
          <Timeline>
            {replies.map(reply => (
              <Tweet {...reply} key={reply.id} />
            ))}
          </Timeline>
        )}
        {activeUser && <TweetInput onSubmit={this.onSubmit} />}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, { match: { params } }) => ({
  activeUser: getUserById(state.users, state.users.active),
  tweet: getTweetMeta(state, getTweetById(state.tweets, params.tweetId)),
  replies: getRepliesById(state.tweets, params.tweetId).map(tweet =>
    getTweetMeta(state, tweet),
  ),
});

const mapDispatchToProps = { createTweet };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TweetPage);
