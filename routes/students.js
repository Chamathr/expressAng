const express = require('express');
const router = express.Router();
const ConnectDB = require('../connectdb');
const { db } = require('../models/students');
const Student = require('../models/students');


router.get('/', async (req, res) => {
    try{
        ConnectDB(async (db) => {
            const data = await db.collection('students').find().toArray()
            res.status(200).json(data)
        }, res)
        
    }catch(error){
        res.status(500).json({ message: 'Error connecting to db', error });
    }
   
})


router.post('/add', async (req, res) => {
    try{
    ConnectDB(async (db) => {
        await db.collection('students').insertOne(req.body)
        const data = await db.collection('students').findOne({ name: req.body.name });
        res.status(200).json(data)
    }, res)
    }catch{
        res.status(500).json({message: 'Insert Error', error })
    }
})

router.put('/update/:name', async (req, res) => {
    try{
    ConnectDB(async (db) => {
        const name = req.params.name;
        await db.collection('students').updateOne({name: name},
            {
                '$set': {
                "name" : req.body.name,
                "age" : req.body.age,
                "comments" : req.body.comments
            }}
         )
         res.status(200).json('Succesfully updated')
    }, res)

    }catch{
        res.status(500).json({message: 'Update error', error})
    }
})

router.delete('/delete/:name', async (req, res) => {
    try{
    ConnectDB(async (db) => {
        await db.collection('students').deleteOne({name: req.params.name})
        res.status(200).json({message: 'Succesfully deleted'})
    }, res)

    }catch{
        res.status(500).json({message: 'Delete error' , error})
    }
})



module.exports = router;