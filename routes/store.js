const express = require('express')
const router = express.Router()
const path = require('path')

const Store = require('../model/store')

router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, "../public/store.html"))
})


router.post('/add-item', async (req, res, next) => {
    try {
        const store = await Store.create({
            itemName: req.body.itemName,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity
        })
        console.log(store)
        res.status(201).json({
            message: "User added successuflly",
            storeData: store
        })

    }
    catch (err) {
        console.error("Error while adding item")
        res.status(500).json({
            message: "item not added"
        })
    }
})


router.get('/store/get-items', async (req, res, next) => {
    try {
        const items = await Store.findAll()
        res.status(200).json({
            allItems: items
        })
    }
    catch (error) {
        console.log(error)
    }
})

router.put('/store/edit-item/:Id/:count', async (req, res, next) => {

    try {
        const itemId = req.params.Id
        const count = parseInt(req.params.count)

        console.log(itemId)
        console.log(count)

        const item = await Store.findByPk(itemId)
if(count<=item.quantity){
    item.quantity = item.quantity - count
    await item.save()
}
else{
    console.log('No more item available')
}

       
        res.status(200).json({ message: "item updated ", data: item })
    }
    catch (err) {
        console.log(err)
        res.json({ message: "Failed" })
    }


})


router.delete('/store/delete-item/:Id', async (req,res,next)=>{
  try{
const itemId=req.params.Id
await Store.destroy({where:{id:itemId}})
res.status(200).json({message:"Item deleted successfully"})
  }
  catch(error){
    console.log(error)
    res.status(500).json({message:'Failed to delete deleted'})
  }
})



module.exports = router