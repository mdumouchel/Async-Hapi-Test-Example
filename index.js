var db = require('./db') 
var aws = require('./aws') 
var async = require('async');

var routes = [{
 method: 'PUT',
 path: '/upload/{id}',
 config: {
     handler: function(req,reply) {
         async.waterfall([
             function checkEntityInDbExists(callback) {
                 db.check(req.params.id);
                 callback(null, req.params.id);
             },
             function uploadPictureToAWS(entityId, callback) {
                 aws.upload(entityId);
                 callback(null, entityId);
             },
             function savePictureLinkInDbEntity(entityId, callback) {
                 var imageLink = db.savePic(entityId);
                 callback(null, imageLink);
             }
         ], function(err, result) {
             if (err) {
                 return reply(err);
             }
             return reply(result);
         });
     }
 }
}];

module.exports = routes;

// How I setup my hapi app's I have routes folder that look like this
// and than in my server file I have 

// server.route(require('./routes');