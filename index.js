const express=require('express');
const cors=require('cors')
const jwt=require('jsonwebtoken')
require('dotenv').config()

const app=express();
const {Connection}=require('./config/db')

const {ShoppingRouter}=require('./route/shopping.router')
const {ShoppingMiddleware}=require('./middleware/shopping.middleware')

app.use(express.json())
app.use(cors())


app.get('/',(req,res)=>{res.send('This is the base router of mock7 project')})
app.post('/post',ShoppingMiddleware,ShoppingRouter)
app.get('/get',ShoppingRouter)
app.get('/get/cat',ShoppingRouter)
app.get('/get/sort',ShoppingRouter)
app.delete('/buy',ShoppingRouter)


app.listen(1400,async()=>{
  try{
  await Connection
  console.log('Connected to the database')
  }
  catch(err){
    console.log(err)
  }
})