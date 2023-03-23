
const ShoppingMiddleware= async(req,res,next)=>{
     try{
        const {name,category,description,image,postedAt,price}=req.body;
        if(!name||!description||!category||!image||!postedAt||!price) return res.status(401).json({'msg':"Please provide all deatails"})
        next()
     }
     catch(err){
        console.error(err)
        res.status(500).json({'msg':"Something went wrong"})

     }
}

module.exports={ShoppingMiddleware}