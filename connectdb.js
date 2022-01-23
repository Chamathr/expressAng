const ConnectDB = async (req, res) => {

    const { MongoClient } = require('mongodb');
    const uri = 'mongodb://localhost:27017';

    try {
        const client = await MongoClient.connect(uri, { useNewUrlParser: true });
        const db = client.db('CrudDB');
        await req(db)
        client.close();

    } catch (error) {
        res.status(500).json({ message: 'Error connecting to db', error });
    }
}

module.exports = ConnectDB;