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

function respondAsImage(res, statusCode) {
    statusCode = statusCode || 200;
    return function (entity) {
        if (entity) {   	        	
        	console.log(entity);
        	
        	res.writeHead(200, {'Content-Type':  entity.picture.mimetype  });
        	console.log('hi there');
            res.write(entity.picture, 'binary');
            console.log('hi there');
            
        }
    };
}


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
        .then(respondAsImage(res))
        .catch(handleError(res));
}

function digestPicture(body) {
	console.log(body);
	
	
	
	//Get the mimetype of the file using regex
	var regexp = /^data:([^;]+)/;
	var match = regexp.exec(body.picture);
	var mimetype = match[1];
	console.log(match[1]);
	
	//Get the base64 payload
	var dataIdx = body.picture.indexOf('base64')+ 6;
	var b64data = body.picture.substring(dataIdx);
	
	//convert the base 64 into a buffer
	var buf = new Buffer(b64data, 'base64');
	
	//return the formatted image
	return {
		mimetype: mimetype,
		picture: buf,
		user_id: body.user_id
	};
	
	
	
	
}

// Creates a new Picture in the DB
export function create(req, res) {
    Picture.createAsync( digestPicture( req.body) )
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