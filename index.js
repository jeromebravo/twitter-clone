const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
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

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));