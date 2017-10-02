'use strict'
const sinon = require('sinon')
const chai = require('chai');
const sinonChai = require('sinon-chai')
chai.use(sinonChai)
chai.should();


const helpers = require('./helpers')

// this module
const ipFilter = require('../')


describe('bluemix-cf-ip-filter', () => {

    describe('Test middleware in allow mode', () => {

        const listedIPs = ['10.34.54.1', '23.45.65.4']
        const unlistedIPs = ['1.2.2.2', '2.5.2.2']

        const middleware = ipFilter(listedIPs)

        it('Should allow listed IPs', () => {

            const testReqs = listedIPs.map(helpers.mockProxiedReqFromIP)

            testReqs.forEach((req) => {
                const nextSpy = sinon.spy()

                middleware(req, {}, nextSpy)

                nextSpy.should.have.been.calledOnce
            })

        })

        it('Should not allow un-listed IPs', () => {

            const testReqs = unlistedIPs.map(helpers.mockProxiedReqFromIP)

            testReqs.forEach((req) => {
                const res = helpers.mockRes()
                const nextSpy = sinon.spy()

                middleware(req, res, nextSpy)

                nextSpy.should.not.have.been.called
                res.state().sent.should.be.true
                res.state().statusCode.should.equal(403)

            })

        })


    })

    describe('Test middleware in block mode', () => {

        const listedIPs = ['10.34.54.1', '23.45.65.4']
        const unlistedIPs = ['1.2.2.2', '2.5.2.2']

        const middleware = ipFilter(listedIPs, 'block')

        it('Should not allow listed IPs', () => {
            const testReqs = listedIPs.map(helpers.mockProxiedReqFromIP)

            testReqs.forEach((req) => {
                const res = helpers.mockRes()
                const nextSpy = sinon.spy()

                middleware(req, res, nextSpy)

                nextSpy.should.not.have.been.called
                res.state().sent.should.be.true
                res.state().statusCode.should.equal(403)

            })

        })

        it('Should allow un-listed IPs', () => {

            const testReqs = unlistedIPs.map(helpers.mockProxiedReqFromIP)

            testReqs.forEach((req) => {
                const nextSpy = sinon.spy()

                middleware(req, {}, nextSpy)

                nextSpy.should.have.been.called
            })

        })

    })
})