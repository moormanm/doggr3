'use strict';

var app = require('../..');
import request from 'supertest';
var fs = require('fs');

var newPicture;

describe('Picture API:', function () {

    describe('GET /api/pictures', function () {
        var Pictures;

        beforeEach(function (done) {
            request(app)
                .get('/api/pictures')
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    Pictures = res.body;
                    done();
                });
        });

        it('should respond with JSON array', function () {
            Pictures.should.be.instanceOf(Array);
        });

    });

    describe('POST /api/pictures', function () {
        var pic = fs.readFileSync('Mr_muffin.png');

        var encodedPic = Buffer(pic).toString('base64');
        var preamble = 'data:image/png;base64,';

        encodedPic = preamble + encodedPic;

        beforeEach(function (done) {
            request(app)
                .post('/api/pictures')
                .send({
                    picture: encodedPic
                })
                .expect(201)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    newPicture = res.body;
                    done();
                });
        });

        it('should respond with the newly created Picture', function () {
            console.log(newPicture);
            newPicture.picture.should.exist();
        });

    });

    describe('GET /api/pictures/:id', function () {
        var Picture;

        beforeEach(function (done) {
            request(app)
                .get('/api/pictures/' + newPicture._id)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    Picture = res.body;
                    done();
                });
        });

        afterEach(function () {
            Picture = {};
        });

        it('should respond with the requested Picture', function () {
            newPicture.picture.should.exist();
        });

    });

    describe('DELETE /api/pictures/:id', function () {

        it('should respond with 204 on successful removal', function (done) {
            request(app)
                .delete('/api/pictures/' + newPicture._id)
                .expect(204)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done();
                });
        });

        it('should respond with 404 when Picture does not exist', function (done) {
            request(app)
                .delete('/api/pictures/' + newPicture._id)
                .expect(404)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done();
                });
        });

    });

});