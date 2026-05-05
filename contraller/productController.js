//Create
//read
//Update
//delete
import Product from "../models/product.js"

export async function createProduct (req , res){

    if(req.user == null){
        res.status(401).json({message : "unothorized"})
        return
    }

    if(req.user.isAdmin == false){
        res.status(403).json({message : "Only admins can create products"})
        return
    }

    try{

        const existingProduct = await Product.findOne({productId : req.body.productId})

        if(existingProduct != null){
            res.status(400).json({message : "Product with this productId already exists"})
            return
        }

        const newProduct = new Product(req.body)

        await newProduct.save()
        
        res.json({message : "Product cration successfull"})
        

    }catch(err){
        res.status(500).json({message : err.message})
    }
}


export async function getAllProducts (req, res){

    try{

        if(req.user != null && req.user.isAdmin){

            const Products = await Product.find()
            res.json(Products)

        }else{
            const products = await Product.find({isAvailable : true}) //normal userta Availble una products witharak pennawa
            res.json(products)
        }

    }catch(err){
        res.status(500).json({message : err.message})
    }

}


export async function deleteProduct(req , res){
    try{

        if(req.user != null && req.user.isAdmin){

            const product = await Product.findOne({productId : req.params.productId})
            if (product == null ){
                res.status(404).json({message : "Product Not Foud"})
                return
            }

            await Product.deleteOne({productId : req.params.productId})
            res.json({message : "Product deleted successfully"})

            
        }else{
            res.json({message : "Only Admin can delete the Products"})
            return
        }

    }catch(err){
        res.status(500).json({message : err.message})
    }
}

export async function updateProduct (req , res){

    try{

        if(req.user != null && req.user.isAdmin){

            if(req.body.productId != null){
                res.status(400).json({message : "ProducId canot be updated"})
                return
            }

            await Product.updateOne({productId : req.params.productId} , req.body)

            res.json({message : "Product Updated Successfully"})

        }else{
            res.json({message : "Only Admin can update the Products"})
        }

    }catch(err){
        res.status(500).json({message : err.message})
    }
}


export async function getProductById(req, res){
    try{

        const product = await Product.findOne({ productId : req.params.productId})  //product ekata adala id eken product ekk thiyenwada kiyala balnawa mulinma

        if (product == null){
            res.status(404).json({message : "Product not found"})
            return
        }

        if(product.isAvailable){
            res.json(product)
        }else{
            if(req.user != null && req.user.isAdmin){
                res.json(product)
            }else{
                res.json({message : "Only admins can view unavailbale products"})
                return
            }
        }

    }catch(err){
        res.status(500).json({message : err.message})
    }
}