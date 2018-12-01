const { app } = require('../server');
const mocha = require("mocha");
const chai = require("chai");
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;

// NOTE: https://mochajs.org/#arrow-functions
// Passing arrow functions (“lambdas”) to Mocha is discouraged.
// Lambdas lexically bind this and cannot access the Mocha context.
it('should return me my index page', (done) => { // research done callback
    chai.request(app)
        .get('/')
        .then(function(res) {
            expect(res).to.have.status(200) // always start with the simpliest test
            return done();
        })
        .catch(err => done(err))
});