module.exports = class MochExpressResponse {
    new() {
        this.state.sent = false
    }

    status(code) {
        this.state.statusCode = code
        return this
    }

    send() {
        this.state.sent = true
        return this
    }

    state() {
        return this.state
    }
}