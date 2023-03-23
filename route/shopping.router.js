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


//get
ShoppingRouter.get('/get', async (req, res) => {
    try {
        let newdata = await ShoppingModel.find()
        res.status(201).json({ 'msg': newdata })
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ 'msg': "Something went wrong" })
    }
})
//get page
ShoppingRouter.get('/get/page', async (req, res) => {
    try {
        const page=req.query.page;
        if(!page){
            let newdata = await ShoppingModel.find()
        res.status(201).json({ 'msg': newdata })
        }
        let newdata = await ShoppingModel.find().skip(page*4-(4)).limit(4)
        res.status(201).json({ 'msg': newdata })
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ 'msg': "Something went wrong" })
    }
})
//get by category
ShoppingRouter.get('/get/cat', async (req, res) => {
    try {
        const cat=req.query.cat;
        if(!cat){
            let newdata = await ShoppingModel.find()
         return   res.status(201).json({ 'msg': newdata })
        }
        let newdata = await ShoppingModel.find({category:cat})
        res.status(200).json({ 'msg': newdata })
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ 'msg': "Something went wrong" })
    }
})
//sort by date
ShoppingRouter.get('/get/sort', async (req, res) => {
    try {
        const val=req.query.sort;
        if(!val){
            let newdata = await ShoppingModel.find()
            return   res.status(201).json({ 'msg': newdata })
        }
        let ser;
        if(val=='asc'){
            ser=1
        }else{
            ser=-1
        }
        console.log(ser)
        let newdata = await ShoppingModel.find({}).sort({postedAt:ser})
        res.status(201).json({ 'msg': newdata })
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ 'msg': "Something went wrong" })
    }
})

//Delete
ShoppingRouter.delete('/buy', async (req, res) => {
    try {
       const id=req.query.id;
       if(!id) return res.status(403).json({ 'msg': "Provide id as a params" })
       await ShoppingModel.findByIdAndDelete(id)
       res.status(200).json({ 'msg': "Item is deleted" })

    }
    catch (err) {
        console.error(err)
        res.status(500).json({ 'msg': "Something went wrong" })
    }
})
//search by name
ShoppingRouter.get('/get/search', async (req, res) => {
    try {
       const name=req.query.name;
       if(!name){
        let newdata = await ShoppingModel.find()
        return   res.status(201).json({ 'msg': newdata })
       }
       const data=await ShoppingModel.find({ name: { $regex: new RegExp(name, "i") } })
       res.status(200).json({ 'msg': data })
    
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ 'msg': "Something went wrong" })
    }
})





module.exports = { ShoppingRouter }