const proxyaddr = require('proxy-addr')

module.exports = function cfIpFilter(ipList, mode = 'allow') {
    return (req, res, next) => {
        const requestIps = proxyaddr.all(req)
        const originIp = requestIps[requestIps.length - 1]

        if ((ipList.includes(originIp) && mode === 'allow') ||
            (!ipList.includes(originIp) && mode === 'block')) {
            next()
        } else {
            res.status(403).send()
        }
    }
}