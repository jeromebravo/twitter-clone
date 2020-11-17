import React from 'react';
import {connect} from 'react-redux';
import Reply from './Reply';

const ReplyList = ({replies}) => replies.map(reply => <Reply key={reply._id} reply={reply} />);

const mapStateToProps = state => ({
    replies: state.tweet.tweet.replies
});

export default connect(mapStateToProps)(ReplyList);