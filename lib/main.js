const pwgen = require('./pwgen')
const arguments = process.argv.splice(2, process.argv.length - 2)

pwgen({ arguments })
