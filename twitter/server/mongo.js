const env = require('./environment/environment');

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const mongoUri = `mongodb://${env.dbName}:${env.key}@${env.dbName}.documents.azure.com:${env.cosmoPort}/?ssl=true`

function connect() {
    return mongoose.connect(mongoUri, { useNewUrlParser: true ,  useUnifiedTopology: true })
                .then(() => console.log("Connection to CosmosDB successful"))
                .catch((error) => console.log(error))
}

module.exports = {
    connect, 
    mongoose
}