process.env.NODE_ENV = 'test';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app.js';
import Products from '../models/Product.js';

const expect = chai.expect;
// const should = chai.should;

chai.use(chaiHttp);

let pId = [];
let pId2 = [];

// clean up database  before and after each test

beforeEach((done) => {
  Products.deleteMany({}, function (err) {});
  // Users.deleteMany({}, function (err) {});

  done();
});
afterEach((done) => {
  Products.deleteMany({}, function (err) {});
  //   Users.deleteMany({}, function (err) {});

  done();
});

describe('Test Product Collection', function () {
  it('should register + login a user, create product and verify 1 in DB', (done) => {
    // 1. Register new user
    let user = {
      username: 'Kate',
      email: 'Kate@gmail.com',
      password: 'Kate',
      isAdmin: true,
    };

    chai
      .request(app)
      .post('/api/auth/register')
      .send(user)
      .end((err, res) => {
        // Asserts
        expect(res.status).to.be.equal(201);
        expect(res.body).to.be.a('object');

        // 2 Login the user
        chai
          .request(app)
          .post('/api/auth/login')
          .send({ username: 'Kate', password: 'Kate' })
          .end((err, res) => {
            expect(res.status).to.be.equal(200);
            // expect(res.body.error).to.be.equal(null);
            let Token = res.body.accessToken;

            // 3 Create a Product

            let product = {
              title: 'Product title',
              desc: 'Product description1',
              img: 'Product Image',
              color: 'green',
              price: '120',
            };

            chai
              .request(app)
              .post('/api/product')
              .set({ token: `Bearer ${Token}` })
              .send(product)
              .end((err, res) => {
                // Asserts

                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.a('object');

                let savedProduct = res.body;
                pId.push(savedProduct.title);
                expect(savedProduct.title).to.be.equal(product.title);
                expect(savedProduct.desc).to.be.equal(product.desc);
                expect(savedProduct.img).to.be.equal(product.img);
                expect(savedProduct.price).to.be.equal(product.price);

                //  Verify one product in test db
                chai
                  .request(app)
                  .get('/api/product')
                  .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.be.a('array');
                    // expect(res.body.length).to.be.greaterThan(1);

                    done();
                  });
              });
          });
      });
  });

  it('should register + login a user, create product, edit product in DB', (done) => {
    // 1. Register new user
    let user = {
      username: 'Kate1',
      email: 'Kate1@gmail.com',
      password: 'Kate1',
      isAdmin: true,
    };

    chai
      .request(app)
      .post('/api/auth/register')
      .send(user)
      .end((err, res) => {
        // Asserts
        expect(res.status).to.be.equal(201);
        expect(res.body).to.be.a('object');

        // 2 Login the user
        chai
          .request(app)
          .post('/api/auth/login')
          .send({ username: 'Kate1', password: 'Kate1' })
          .end((err, res) => {
            expect(res.status).to.be.equal(200);
            // expect(res.body.error).to.be.equal(null);
            let Token = res.body.accessToken;

            // 3 Create a Product

            let product = {
              title: 'Product Kate 2',
              desc: 'Product description 2',
              img: 'Product Image 2',
              color: 'green 2',
              price: '100',
            };

            chai
              .request(app)
              .post('/api/product')
              .set({ token: `Bearer ${Token}` })
              .send(product)
              .end((err, res) => {
                // Asserts

                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.a('object');

                let savedProduct = res.body;
                let productId = res.body._id;
                expect(savedProduct.title).to.be.equal(product.title);
                expect(savedProduct.desc).to.be.equal(product.desc);
                expect(savedProduct.img).to.be.equal(product.img);
                expect(savedProduct.price).to.be.equal(product.price);
                pId2.push(savedProduct.title);
                // Update one product in test db

                let updatedProduct = {
                  title: 'Product Kate Updated',
                  desc: 'Product description Updated',
                  img: 'Product Image Updated',
                  color: 'brown',
                  price: '203',
                };

                chai
                  .request(app)
                  .put(`/api/product/${productId}`)
                  .set({ token: `Bearer ${Token}` })
                  .send(updatedProduct)
                  .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.be.a('object');
                    setTimeout(() => {
                      done();
                    }, 300);
                  });
              });
          });
      });
  });
  it('should register + login a user, create product and delete it from the db', (done) => {
    // 1. Register new user
    let user = {
      username: 'John',
      email: 'John@gmail.com',
      password: 'John',
      isAdmin: true,
    };

    chai
      .request(app)
      .post('/api/auth/register')
      .send(user)
      .end((err, res) => {
        // Asserts
        expect(res.status).to.be.equal(201);
        expect(res.body).to.be.a('object');

        // 2 Login the user
        chai
          .request(app)
          .post('/api/auth/login')
          .send({ username: 'John', password: 'John' })
          .end((err, res) => {
            expect(res.status).to.be.equal(200);
            // expect(res.body.error).to.be.equal(null);
            let Token = res.body.accessToken;

            // 3 Create a Product

            let product = {
              title: 'Product Kate 3',
              desc: 'Product description 3',
              img: 'Product Image 3',
              color: 'brown',
              price: '230',
            };

            chai
              .request(app)
              .post('/api/product')
              .set({ token: `Bearer ${Token}` })
              .send(product)
              .end((err, res) => {
                // Asserts

                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.a('object');

                let savedProduct = res.body;
                let productId = res.body._id;
                expect(savedProduct.title).to.be.equal(product.title);
                expect(savedProduct.desc).to.be.equal(product.desc);
                expect(savedProduct.img).to.be.equal(product.img);
                expect(savedProduct.price).to.be.equal(product.price);

                // Delete one product in test db

                chai
                  .request(app)
                  .delete(`/api/product/${productId}`)
                  .set({ token: `Bearer ${Token}` })
                  .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    setTimeout(() => {
                      done();
                    }, 300);
                  });
              });
          });
      });
  });
});
