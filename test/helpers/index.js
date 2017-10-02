const MockReq = require('mock-express-request')
const MockRes = require('./mock-res')

module.exports.mockProxiedReqFromIP = function mockProxiedReqFromIP(originIP) {
    return new MockReq({
        // mock proxy address headers
        headers: {
            'X-Forwarded-For': `${originIP}`
        },

        connection: {
            remoteAddress: '1.1.1.1'
        }
    })
}

module.exports.mockRes = function createMockRes() {
    return new MockRes()
}