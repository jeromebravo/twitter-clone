const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();

// connect database
connectDB();

app.use(cors());
app.use(express.json({extended: false}));

// define routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/follow', require('./routes/follow'));
app.use('/api/tweet', require('./routes/tweet'));
app.use('/api/user', require('./routes/user'));
app.use('/api/search', require('./routes/search'));
app.use('/api/newsfeed', require('./routes/newsfeed'));
app.use('/api/like', require('./routes/like'));
app.use('/api/retweet', require('./routes/retweet'));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));