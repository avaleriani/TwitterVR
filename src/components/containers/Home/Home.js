import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TweetInput from '../../components/TweetInput';
import { logout, getUserById } from '../../modules/users';
import { createTweet, getTweetById, getAllTweets } from '../../modules/tweets';
import Tweet from '../../components/Tweet';
import Timeline from '../../components/Timeline';
import sortByDatetime from '../../utils/datetime';

export class Home extends React.Component {
  static propTypes = {
    activeUser: PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string,
    }).isRequired,
    tweets: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    createTweet: PropTypes.func.isRequired,
  };

  onSubmit = text => {
    const {
      createTweet,
      activeUser: { id: userId },
    } = this.props;
    createTweet({ userId, text });
  };

  render() {
    const { tweets } = this.props;

    return (
      <React.Fragment>
        <TweetInput onSubmit={this.onSubmit} />
        <Timeline>
          {tweets.map(tweet => (
            <Tweet {...tweet} key={tweet.id} />
          ))}
        </Timeline>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  activeUser: getUserById(state.users, state.users.active),
  tweets: getAllTweets(state.tweets)
    .map(tweet => ({
      ...tweet,
      repliedTweet: getTweetById(state.tweets, tweet.replyToId),
      user: getUserById(state.users, tweet.userId),
    }))
    .sort(sortByDatetime),
});

const mapDispatchToProps = { logout, createTweet };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
