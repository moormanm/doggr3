/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/Pictures              ->  index
 * POST    /api/Pictures              ->  create
 * GET     /api/Pictures/:id          ->  show
 * PUT     /api/Pictures/:id          ->  update
 * DELETE  /api/Pictures/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Picture from './picture.model';

function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function (entity) {
        if (entity) {
            res.status(statusCode).json(entity);
        }
    };
}

function saveUpdates(updates) {
    return function (entity) {
        var updated = _.merge(entity, updates);
        return updated.saveAsync()
            .spread(updated => {
                return updated;
            });
    };
}

function removeEntity(res) {
    return function (entity) {
        if (entity) {
            return entity.removeAsync()
                .then(() => {
                    res.status(204).end();
                });
        }
    };
}

function handleEntityNotFound(res) {
    return function (entity) {
        if (!entity) {
            res.status(404).end();
            return null;
        }
        return entity;
    };
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function (err) {
        res.status(statusCode).send(err);
    };
}

// Gets a list of Pictures
export function index(req, res) {
    Picture.findAsync()
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets a single Picture from the DB
export function show(req, res) {
    Picture.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Creates a new Picture in the DB
export function create(req, res) {
    Picture.createAsync(req.body)
        .then(respondWithResult(res, 201))
        .catch(handleError(res));
}

// Deletes a Picture from the DB
export function destroy(req, res) {
    Picture.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}