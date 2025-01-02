const express=require('express')
const router=express.Router()

const {getAllSuppliers,getSupplierById,createSupplier, UpdateSupplier,deleteSupplier,searchSupplier}=require('../../Controllers/StoreControllers/supplier')

router.get('/',getAllSuppliers)
router.get('/:id',getSupplierById)
router.post('/',createSupplier)
router.patch('/:id',UpdateSupplier)
router.delete('/:id',deleteSupplier)
router.post('/search',searchSupplier)



module.exports=router;
