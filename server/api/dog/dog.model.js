'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var DogSchema = new mongoose.Schema({
    user_id: {
        type: String,
        index: true
    },
    name: String,
    picture: {
        type: [mongoose.ObjectId]
    },
    location: String,
    breed: [String],
    comments: String
});


export default mongoose.model('Dog', DogSchema);