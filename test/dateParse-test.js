var chai = require("chai");
var expect = chai.expect;
var dateParse = require("../app/dateParse.js");

describe('dateServer', function() {
   it("inputToOutput should return input date in other format", function() {
       expect(dateParse.inputToOutput("1450137600").natural).to.equal(
           'December 15, 2015');
        expect(dateParse.inputToOutput("December 15, 2015").unix).to.equal(
            1450137600);
        expect(dateParse.inputToOutput("December%2015,%202015").unix).to.equal(
            1450137600);
   });
});