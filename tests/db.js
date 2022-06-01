const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};


// Provice connection to a new in-memory database server.
const connect = async () => {
    await mongoose.disconnect();

    mongoServer = await MongoMemoryServer.create();
    const dbUrl = await mongoServer.getUri();

    await mongoose.connect(dbUrl, opts, err => {
        if (err) {
            console.error(err);
        }
    });
};


// Remove and close the database and server.
const close = async () => {
    await mongoose.disconnect();
    if(mongoServer !== undefined) {
        await mongoServer.stop();
    }
};


// Remove all data from collections.
const clear = async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
};

module.exports = {
    connect,
    close,
    clear,
};