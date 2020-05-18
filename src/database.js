const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/coxti', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(db => console.log('Database connected'))
    .catch(error => console.log("Database Mongo ERROR:", err));