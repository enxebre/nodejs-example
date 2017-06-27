var http = require('http');
var assert = require('assert');
var server = require('../server-api.js');
var port = 1234;

describe('HTTP Server Test', function() {
	before(function() {
		server.listen(port);
	});

	after(function() {
		server.close();
	});

	describe('/', function() {
		it('should be Hello, Kubeflow!', function(done) {
			http.get('http://127.0.0.1:' + port, function(response) {
				// Assert the status code
				assert.equal(response.statusCode, 200);

				var body = '';
				response.on('data', function(d) {
					body += d;
				});
				response.on('end', function() {
					// Let's wait until we read the response
					assert.equal(body, 'Hello, Kubeflow!');
					done();
				});
			});
		});
	});
});
//source https://gist.github.com/soheilhy/867f76feea7cab4f8a84