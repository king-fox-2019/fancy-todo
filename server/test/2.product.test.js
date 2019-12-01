// install chai
const chai = require('chai')
// install chai-http
const chaiHttp = require('chai-http')

const app = require('../app')
const Product = require('../models/product')

chai.use(chaiHttp)
const expect= chai.expect
//hooks 
// new user --- > pertama buat initial test buat nandain kalo jalan routernya
before(function() {
  const data = {
    name : 'tempe',
    qty : 10,
    price : 20000,
    category : 'food',
    image : 'ini gambar'
  }
  Product.create(data)
    .then(product => console.log('initial test success'))
    .catch(console.log)
})
// bikin hooks untuk menghapus semua data di database 
after(function(done) {
  if(process.env.NODE_ENV === 'testing') {
    Product.deleteMany({})
      .then(_ => {
        console.log('all data deleted')
        done()
      })
      .catch(console.log)
  }
})


let newProduct = {
    name : 'ayam',
    qty : 10,
    price : 30000,
    category : 'food',
    image : 'ini gambar'
}

let validUser = {
    email : 'royhanm23@gmail.com',
    password : '12345'
}

let validToken = ''

describe(`test add product`, function() {
    describe(`login user succes`, function() {
        it(`should send a message login succes with status 200 `, function(done) {
            chai.request(app)
                .post('/login')
                .send(validUser)
                .end( function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an("object").to.have.any.keys('msg', 'token')
                    validToken = res.body.token
                    expect(res.body.msg).to.equal('login succes')
                    done()
                })
        })
    })
    describe(`add new product succes`, function() {
        it(`should send a posted data with status 201 `, function(done) {
            chai.request(app)
                .post('/products')
                .send(newProduct)
                .set('token', validToken)
                .end( function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an("object").to.have.any.keys('name', 'qty','price', 'category', 'image')
                    expect(res.body.name).to.equal('ayam')
                    expect(res.body.qty).to.equal(10)
                    expect(res.body.price).to.equal(30000)
                    expect(res.body.category).to.equal('food')
                    expect(res.body.image).to.equal('ini gambar')
                    done()
                })
        })
    })
    describe(`add new product fail, invalid name`, function() {
        it(`should send a posted data with status 400 with message you must input name`, function(done) {
            let noName = {...newProduct}
            delete noName.name
            chai.request(app)
                .post('/products')
                .send(noName)
                .set('token', validToken)
                .end( function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an("object").to.have.key('msg')
                    expect(res.body.msg[0]).to.equal('you must input name')                    
                    done()
                })
        })
    })
    describe(`add new product fail, invalid price`, function() {
        it(`should send a posted data with status 400 with message you must input name`, function(done) {
            let invalid = {...newProduct}
            delete invalid.price
            chai.request(app)
                .post('/products')
                .send(invalid)
                .set('token', validToken)
                .end( function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an("object").to.have.key('msg')
                    expect(res.body.msg[0]).to.equal('you must input price')
                    done()
                })
        })
    })
    describe(`add new product fail, invalid quantity`, function() {
        it(`should send a posted data with status 400 with message you must input name`, function(done) {
            let invalid = {...newProduct}
            delete invalid.qty
            chai.request(app)
                .post('/products')
                .send(invalid)
                .set('token', validToken)
                .end( function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an("object").to.have.key('msg')
                    expect(res.body.msg[0]).to.equal('you must input quantity')
                    done()
                })
        })
    })
    describe(`add new product fail, invalid category`, function() {
        it(`should send a posted data with status 400 with message you must input name`, function(done) {
            let invalid = {...newProduct}
            delete invalid.category
            chai.request(app)
                .post('/products')
                .send(invalid)
                .set('token', validToken)
                .end( function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an("object").to.have.key('msg')
                    expect(res.body.msg[0]).to.equal('you must input category')
                    done()
                })
        })
    })    
})    

let validProduct
describe(`test get products`, function() {
    describe(`get all products`, function() {
        it(`should send list of producs with status 200 `, function(done) {
            chai.request(app)
                .get('/products')
                .end( function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an("array")
                    res.body.forEach(product => {
                        expect(product).to.have.any.keys(['name', 'price', 'qty', 'image', 'user', 'category'])
                    }); 
                    validProduct = res.body[0]._id   
                    console.log('================',validProduct)                
                    done()
                })
        })
    })
    describe(`get one products fail, invalid product id`, function() {
        it(`should send one producs with status 200 `, function(done) {
            let invalidProduct = '1212'
            chai.request(app)            
                .get(`/products/${invalidProduct}`)
                .end( function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an("object").to.have.any.keys('msg')
                    expect(res.body.msg).to.equal('id invalid')                    
                    done()
                })
        })
    })
    describe(`get one products succes`, function() {
        it(`should send one producs with status 200 `, function(done) {
            chai.request(app)
                .get(`/products/${validProduct}`)
                .end( function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an("object").to.have.any.keys('name', 'qty','price', 'category', 'image')
                    expect(res.body.name).to.equal('tempe')
                    expect(res.body.qty).to.equal(10)
                    expect(res.body.price).to.equal(20000)
                    expect(res.body.category).to.equal('food')
                    expect(res.body.image).to.equal('ini gambar')
                    done()
                })
        })
    })
    describe(`get one products fail, product not found`, function() {
        it(`should send one producs with status 404 `, function(done) {
            chai.request(app)            
                .get(`/products/5dcadd795dcd976102256012`)
                .end( function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(404)
                    expect(res.body).to.be.an("object").to.have.any.keys('msg')
                    expect(res.body.msg).to.equal('product not found')                    
                    done()
                })
        })
    })
})

describe(`test update product`, function() {
    describe(`update product succes`, function() {
        it(`should send the updated product status 200 `, function(done) {
            chai.request(app)
                .post(`/products/${validProduct}`)
                .end( function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an("array")
                    res.body.forEach(product => {
                        expect(product).to.have.any.keys(['name', 'price', 'qty', 'image', 'user', 'category'])
                    }); 
                    validProduct = res.body[0]._id   
                    console.log('================',validProduct)                
                    done()
                })
        })
    })
})    
