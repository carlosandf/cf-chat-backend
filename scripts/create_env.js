const fs = require('fs')

const content = `
MONGO_URI=${process.env.MONGO_URI}\n
SECRET_KEY=${process.env.SECRET_KEY}\n
`

fs.writeFileSync('./.env', content)