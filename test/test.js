let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require("../index");

// Assertion Style
chai.should();

chai.use(chaiHttp);

let id = "";

describe("Get specific API", () => {
    // Test GET route
    describe("GET /api/contacts", () => {
        it("It should GET all the contacts", (done) => {
            chai.request(server)
                .get("/api/contacts")
                .end((err,response) =>{
                    response.should.have.status(200);
                    response.body.data.should.be.a("array");
                done();
                })
        }).timeout(4000)
        it("It should get 404 if api is incorrect", (done) => {
            chai.request(server)
                .get("/api/contact")
                .end((err,response) =>{
                    response.should.have.status(404);
                done();
                })
        })
    })

    // Test POST route
    describe("POST /api/contacts", () => {
        it("It should create a contact", (done) => {
            const dummyContact = {
                name: "dummyTest",
                phone: "987654321",
                email: "dummyemail@gmail.com",
                gender: "Male"
            }
            chai.request(server)
                .post("/api/contacts/")
                .send(dummyContact)
                .end((err,response) =>{
                    response.should.have.status(201);
                    response.body.data.should.be.a("object");
                    id = response.body.data._id;
                    response.body.data.should.have.property("_id")
                    response.body.data.should.have.property("name").eq("dummyTest");
                    response.body.data.should.have.property("email").eq("dummyemail@gmail.com");
                    response.body.data.should.have.property("phone").eq("987654321");
                    response.body.data.should.have.property("gender").eq("Male");
                done();
                })
        })
    
    })

    // Test GET(by id) route
    describe("GET /api/contacts/:id", () => {
        it("It should GET a contact by id", (done) => {
            chai.request(server)
                .get("/api/contacts/" + id)
                .end((err,response) =>{
                    response.should.have.status(200);
                    response.body.data.should.be.a("object");
                    response.body.data.should.have.property("_id")
                    response.body.data.should.have.property("name").eq("dummyTest");
                    response.body.data.should.have.property("email").eq("dummyemail@gmail.com");
                    response.body.data.should.have.property("phone").eq("987654321");
                    response.body.data.should.have.property("gender").eq("Male");
                done();
                })
        })
        it("It should get 404 if id is incorrect", (done) => {
            const wrongId = "Dummyidb470f9777040ac54b"
            chai.request(server)
                .get("/api/contacts/"+wrongId)
                .end((err,response) =>{
                    response.should.have.status(404);
                done();
                })
        })
    })

    // Test PUT(by id) route
    describe("PUT /api/contacts/:id", () => {
        it("It should update a contact", (done) => {
            const dummyContact = {
                name: "dummyTest2",
                phone: "123456789",
                email: "dummyemail2@gmail.com",
                gender: "Female"
            }
            chai.request(server)
                .put("/api/contacts/"+id)
                .send(dummyContact)
                .end((err,response) =>{
                    response.should.have.status(200);
                    response.body.data.should.be.a("object");
                    response.body.data.should.have.property("_id")
                    response.body.data.should.have.property("name").eq("dummyTest2");
                    response.body.data.should.have.property("email").eq("dummyemail2@gmail.com");
                    response.body.data.should.have.property("phone").eq("123456789");
                    response.body.data.should.have.property("gender").eq("Female");
                done();
                })
        })
    
    })

    // Test DELETE(by id) route
    describe("DELETE /api/contacts/:id", () => {
        it("It should delete a contact", (done) => {
            chai.request(server)
                .delete("/api/contacts/"+id)
                .end((err,response) =>{
                    response.should.have.status(200);
                done();
                })
        })
    
    })
})