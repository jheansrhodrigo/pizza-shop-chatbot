const run = require('./config/globalVariables')
let rawData = {
    tunnelOriginator: 'originatorTest@0mn.io',
    tunnelOwner: 'pizzashop@msgingi.net',
    stagingEnvironment: false
}
console.log(run(rawData))