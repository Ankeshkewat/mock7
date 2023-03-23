const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const ShoppingRouter = express.Router();
const { ShoppingModel } = require('../model/shopping.model')

//post
ShoppingRouter.post('/post', async (req, res) => {
    try {
        let newdata = new ShoppingModel(req.body);
        await newdata.save()
        res.status(201).json({ 'msg': "Data added successfully" })
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ 'msg': "Something went wrong" })
    }
})

module.exports = { ShoppingRouter }