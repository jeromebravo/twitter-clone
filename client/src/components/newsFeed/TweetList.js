import React from 'react';
import Tweet from './Tweet';

const TweetList = ({tweets}) => {
    return (
        tweets.map(tweet => <Tweet key={tweet._id} tweet={tweet.tweet} type={tweet.type} retweetedBy={tweet.retweetedBy} />)
    );
}

export default TweetList;