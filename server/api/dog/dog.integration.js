'use strict';

var app = require('../..');
import request from 'supertest';

var newDog;

describe('Dog API:', function () {

    describe('GET /api/dogs', function () {
        var Dogs;

        beforeEach(function (done) {
            request(app)
                .get('/api/dogs')
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    Dogs = res.body;
                    done();
                });
        });

        it('should respond with JSON array', function () {
            Dogs.should.be.instanceOf(Array);
        });

    });

    describe('POST /api/dogs', function () {
        beforeEach(function (done) {
            request(app)
                .post('/api/dogs')
                .send({
                    user_id: 'mayk',
                    name: 'Pancake',
                    location: '123N, 123W', 
                    breed: ['Golden Retriever'],
                    comments: 'She was just born!!',
                    picture : ['ASDF12345ASDF', 'asdasda']
                })
                .expect(201)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    newDog = res.body;
                    done();
                });
        });

        it('should respond with the newly created Dog', function () {
            newDog.name.should.equal('Pancake');
            newDog.comments.should.equal('She was just born!!');
        });

    });

    describe('GET /api/dogs/:id', function () {
        var Dog;

        beforeEach(function (done) {
            request(app)
                .get('/api/dogs/' + newDog._id)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    Dog = res.body;
                    done();
                });
        });

        afterEach(function () {
            Dog = {};
        });

        it('should respond with the requested Dog', function () {
            newDog.name.should.equal('Pancake');
            newDog.comments.should.equal('She was just born!!');
        });

    });

    describe('PUT /api/dogs/:id', function () {
        var updatedDog;

        beforeEach(function (done) {
            request(app)
                .put('/api/dogs/' + newDog._id)
                .send({
                    comments: 'She was just born!! But shes a baaaaaad dog!!!'
                })
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    updatedDog = res.body;
                    done();
                });
        });

        afterEach(function () {
            updatedDog = {};
        });

        it('should respond with the updated Dog', function () {
            updatedDog.comments.should.equal('She was just born!! But shes a baaaaaad dog!!!');
        });

    });

    describe('DELETE /api/dogs/:id', function () {

        it('should respond with 204 on successful removal', function (done) {
            request(app)
                .delete('/api/dogs/' + newDog._id)
                .expect(204)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done();
                });
        });

        it('should respond with 404 when Dog does not exist', function (done) {
            request(app)
                .delete('/api/dogs/' + newDog._id)
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