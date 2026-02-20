describe('API Testing',() => {
    it('overview', () => {
        cy.request({
            method: 'GET',
            url: 'https://api.escuelajs.co/api/v1/categories'
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('array')
        })
    })
    it('single category by id', () => {
        cy.request({
            method: 'GET',
            url: 'https://api.escuelajs.co/api/v1/categories/2'
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('id')
            expect(response.body).to.have.property('name')
            expect(response.body).to.have.property('image')})
        })
    it('create a category', () => {
        cy.request({
            method: 'POST',
            url: 'https://api.escuelajs.co/api/v1/categories/',
            body: {
                "name" : "meja",
                "image" : "https://placeimg.com/640/480/any"
            }
        }).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body).to.have.property('name', 'meja')
            expect(response.body).to.have.property('image', 'https://placeimg.com/640/480/any')
        })
    })
    it('update a category', () => {
        cy.request({
            method: 'PUT',
            url: 'https://api.escuelajs.co/api/v1/categories/1',
            body: {
                "name" : "kursi",
                "image" : "https://placeimg.com/640/480/any"
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('name', 'kursi')
            expect(response.body).to.have.property('image', 'https://placeimg.com/640/480/any')
        })
    })
    it('create a category', () => {
        cy.request({
            method: 'POST',
            url: 'https://api.escuelajs.co/api/v1/categories/',
            body: {
                "name" : "kursi",
                "image" : "https://placeimg.com/640/480/any"
            }
        }).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body).to.have.property('name', 'kursi')
            expect(response.body).to.have.property('image', 'https://placeimg.com/640/480/any')
        })
    })
    it('update a category', () => {
        cy.request({
            method: 'PUT',
            url: 'https://api.escuelajs.co/api/v1/categories/32',
            body: {
                "name" : "botol",
                "image" : "https://placeimg.com/640/480/any"
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('name', 'botol')
            expect(response.body).to.have.property('image', 'https://placeimg.com/640/480/any')
        })
    })
    it('delete a category', () => {
        cy.request({
            method: 'DELETE',
            url: 'https://api.escuelajs.co/api/v1/categories/11'
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    })
    it('single category by id', () => {
        cy.request({
            method: 'GET',
            url: 'https://api.escuelajs.co/api/v1/categories/15'
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('id')
            expect(response.body).to.have.property('name')
            expect(response.body).to.have.property('image')})
    })
    it('single category by slug', () => {
        cy.request({
            method: 'GET',
            url: 'https://api.escuelajs.co/api/v1/categories/slug/tech'
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('id')
            expect(response.body).to.have.property('name')
            expect(response.body).to.have.property('image')})
    })
    it('single category by id', () => {
        cy.request({
            method: 'GET',
            url: 'https://api.escuelajs.co/api/v1/categories/33'
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('id')
            expect(response.body).to.have.property('name')
            expect(response.body).to.have.property('image')})
    })
    it('single category by slug', () => {
        cy.request({
            method: 'GET',
            url: 'https://api.escuelajs.co/api/v1/categories/slug/botol'
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('id')
            expect(response.body).to.have.property('name')
            expect(response.body).to.have.property('image')
        })
    })
    it('create a category', () => {
        cy.request({
            method: 'POST',
            url: 'https://api.escuelajs.co/api/v1/categories/',
            body: {
                "name" : "plosa",
                "image" : "https://placeimg.com/640/480/any"
            }
        }).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body).to.have.property('name', 'plosa')
            expect(response.body).to.have.property('image', 'https://placeimg.com/640/480/any')
        })
    })
    it('create a category', () => {
        cy.request({
            method: 'POST',
            url: 'https://api.escuelajs.co/api/v1/categories/',
            body: {
                "name" : "mouse",
                "image" : "https://placeimg.com/640/480/any"
            }
        }).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body).to.have.property('name', 'mouse')
            expect(response.body).to.have.property('image', 'https://placeimg.com/640/480/any')
        })
    })
    it('delete a category', () => {
        cy.request({
            method: 'DELETE',
            url: 'https://api.escuelajs.co/api/v1/categories/6'
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    })
    it('single category by slug', () => {
        cy.request({
            method: 'GET',
            url: 'https://api.escuelajs.co/api/v1/categories/slug/mouse'
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('id')
            expect(response.body).to.have.property('name')
            expect(response.body).to.have.property('image')})
    })
})

