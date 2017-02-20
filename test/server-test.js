var expect = require("chai").expect;
var request = require("request");

describe("dateParse API calls", function() {
    describe("unixtime call", function() {
        var url = "http://localhost:8080/1450137600";
        it("returns status 200", function(done) {
            request(url, function(error, res, body) {
                expect(res.statusCode).to.equal(200);
                done();
            });
        });
        it("returns natural date", function(done) {
            request(url, function(error, res, body) {
               expect(body.natural).to.equal("December 15, 2015");
               done();
            });
        });
    });
    describe("natural language date call", function() {
        var url = "http://localhost:8080/December%2015,%202015";
        it("returns status 200", function(done) {
            request(url, function(error, res, body) {
                expect(res.statusCode).to.equal(200);
                done();
            });
        });
        it("returns unixtime", function(done) {
            request(url, function(error, res, body) {
               expect(body.natural).to.equal(1450137600);
               done();
            });
        });
    });
});