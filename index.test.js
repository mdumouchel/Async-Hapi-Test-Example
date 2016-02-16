//Required modules
var assert = require("assert");
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var proxyquire = require("proxyquire").noCallThru();
var expect = chai.expect;

chai.should();
chai.use(sinonChai);

describe("Testing route index", function() {
	var sut;
	var db;
	var aws;

	beforeEach(function(){
		db = {
			check: sinon.spy(),
			savePic: sinon.spy(function(){
				return "a link?";
			})
		}
		aws = {
			upload: sinon.spy()
		}
		
		sut = proxyquire('./index', {"./db": db, "./aws": aws});
	});

	describe("upload", function() {
		it("should pass", function(done){
			var request = {
				params: {
					id: 9001
				}
			}

			var reply = function(results) {
				results.should.equal('a link?');
				db.check.should.been.calledOnce;
				db.savePic.should.been.calledOnce;
				aws.upload.should.been.calledOnce;
				done();
			}

			sut[0].config.handler(request, reply);

		});
	});
});