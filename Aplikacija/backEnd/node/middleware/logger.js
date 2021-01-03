const DateNow = require('../classes/DateNow')

    
    //Logger koji u konzoli stampa kojoj rutu koja je stranica trazena
    const logger = (req, res, next) => {
        console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${new DateNow().toString()}`)

        next()
    }

    module.exports = logger