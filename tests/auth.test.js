const app = require('../server');
const mocha = require("mocha");
const chai = require("chai");
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const agent = chai.request.agent(app);
var User = require('../models/user');

// NOTE: https://mochajs.org/#arrow-functions
// Passing arrow functions (“lambdas”) to Mocha is discouraged.
// Lambdas lexically bind this and cannot access the Mocha context.

it('should return /index page', (done) => { // research done callback
    chai.request(app)
        .get('/')
        .then(function(res) {
            expect(res).to.have.status(200) // always start with the simpliest test
            return done();
        })
        .catch(err => done(err))
});

it('should return /start page', (done) => { // research done callback
    chai.request(app)
        .get('/start')
        .then(function(res) {
            expect(res).to.have.status(200) // always start with the simpliest test
            return done();
        })
        .catch(err => done(err))
});

it('should return /login page', (done) => { // research done callback
    chai.request(app)
        .get('/login')
        .then(function(res) {
            expect(res).to.have.status(200) // always start with the simpliest test
            return done();
        })
        .catch(err => done(err))
});

it('should create new user on signup', (done) => {
    User.findOneAndRemove({ username: "testone" }, function() {
        agent
          .post('/signup')
          .send({ username: "testone", password: "password" })
          .end((err, res)=> {
            console.log(res.body)
            res.should.have.status(200);
            res.should.have.cookie("nToken");
            done();
          });
      });
});

it('should not create user if email already exists');
   
// login
it('should login user and return a auth token',  (done)=> {
    agent
      .post('/login')
      .send({ email: "username", password: "password" })
      .end( (err, res)=> {
        res.should.have.status(200);
        res.should.have.cookie("nToken");
        done();
      });
});

it('should not be able to login if they have not registered',(done)=> {
    agent
        .post('/login', { email: "wrong@wrong.com", password: "nope" })
        .end( (err, res)=>{
        console.log("res.status:",res.status);
        
        res.status.should.be.equal(401);
        done();
        });
 
})

it('should logout', (done) => {
    agent
      .get('/logout')
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.not.have.cookie("nToken");
        done();
      });
   });
