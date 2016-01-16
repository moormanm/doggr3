'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var PictureSchema = new mongoose.Schema({
    user_id: {
        type: String,
        index: true
    },
    picture: Buffer
});

export default mongoose.model('Picture', PictureSchema);