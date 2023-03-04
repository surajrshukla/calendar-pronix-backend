const express = require('express');
const db = require('../connection/clientConnection');
const router = express.Router();
const CollectionName = "calendar";

router.post('/update', async (req, res) => {

    const database = await db();
    const returnData = {};
    try {
        const result = await database.collection(CollectionName).updateOne(
            { gridId: req.body.gridId, "reminders.id": req.body.reminder.id },
            {
                $set: {
                    "reminders.$": req.body.reminder
                }
            }
        );
        if (result.acknowledged) {
            returnData.code = "200";
            returnData.message = "Success";
            returnData.data = result.insertedId;
            res.send(returnData);
        }
    } catch (error) {
        returnData.code = "500";
        if (custom_msg == false) {
            returnData.message = "Something Went Wrong";
        }
        returnData.data = {};
        res.send(returnData);
    }
});

router.post('/create', async (req, res) => {
    const database = await db();
    const returnData = {};

    try {
        const result = await database.collection(CollectionName).updateOne(
            { date: req.body.date },
            {
                $set: {
                    year: req.body.year,
                    month: req.body.month,
                    gridId: req.body.gridId
                },
                $addToSet: {
                    reminders: req.body.reminder
                }
            },
            {
                upsert: true
            }
        );
        if (result.acknowledged) {
            returnData.code = "200";
            returnData.message = "Success";
            returnData.data = result.insertedId;
            res.send(returnData);
        }
    } catch (error) {
        returnData.code = "500";
        if (custom_msg == false) {
            returnData.message = "Something Went Wrong";
        }
        returnData.data = {};
        res.send(returnData);
    }
})

router.get('/getData', async (req, res) => {
    const database = await db();
    const returnData = {};
    const query = {
        month: parseInt(req.query.month),
        year: parseInt(req.query.year)
    }
    database.collection(CollectionName).find(query).toArray().then((result) => {
        returnData.code = "200";
        returnData.message = "Success";
        returnData.data = result ? result : [];
        res.send(returnData);
    }).catch(error => {
        returnData.code = "500";
        returnData.message = error.message;
        returnData.data = {};
        res.send(returnData);
    })
})

module.exports = router;