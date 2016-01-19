'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var ObjectId = mongoose.Schema.Types.ObjectId;
var DogSchema = new mongoose.Schema({
    user_id: {
        type: String,
        index: true
    },
    name: String,
    picture: [String],
    location: String,
    breed: [String],
    comments: String
});


export default mongoose.model('Dog', DogSchema);