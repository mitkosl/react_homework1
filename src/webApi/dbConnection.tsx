const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/postsDB');

mongoose.Promise = global.Promise;

mongoose.connection.once('open', () => {
    console.log("Successfuly connected to postsDB");
}).on('error', (error) => {
    console.log("DB connection error: ", error);
});