
const supplier = require('../../models/Store/supplier');

const getAllSuppliers = async (req, res) => {
  if(req.user.role !== 'admin' ) {
    throw new BadRequestError('Access Denied');
  }
    const suppliers = await supplier.find({});
    res.status(200).json({ suppliers });
 
};


const createSupplier=async (req, res) => {
  if(req.user.role !== 'admin' ) {
    throw new BadRequestError('Access Denied');
  }
    const newSupplier=await supplier.create(req.body)
    res.status(200).json({newSupplier})
 
};


const UpdateSupplier=async (req, res) => {
  if(req.user.role !== 'admin' ) {
    throw new BadRequestError('Access Denied');
  }
    const { name } = req.body
    const id= req.params.id;
    const SupplierExists = await supplier.findOne({_id:id})
   
    if(!SupplierExists){
        return  res.status(404).json({message:"Supplier Not Found."})
    }
    const UpdateSupplier= await supplier.findByIdAndUpdate(id,req.body,{new:true,runValidators:true})
    res.status(201).json(UpdateSupplier)

 
   
};

const deleteSupplier=async (req, res) => {
  if(req.user.role !== 'admin' ) {
    throw new BadRequestError('Access Denied');
  }
    const { name } = req.body
    const id= req.params.id;
    const SupplierExists = await supplier.findOne({_id:id})
   
    if(!SupplierExists){
        return  res.status(404).json({message:"Supplier Not Found."})
    }
    await supplier.findByIdAndDelete(id)
    res.status(201).json("Supplier Deleted Successfully")

    
    
};


const getSupplierById = async (req, res) => {
  if(req.user.role !== 'admin' ) {
    throw new BadRequestError('Access Denied');
  }
      const id= req.params.id;
      const SupplierExists = await supplier.findOne({_id:id});
      if(!SupplierExists){
        return  res.status(404).json({message:"Supplier Not Found."})
      }
      res.status(200).json({ SupplierExists });
 
  };


  const searchSupplier = async (req, res) => {
    if(req.user.role !== 'admin' ) {
      throw new BadRequestError('Access Denied');
    }
      const Name  = req.body;
  
      if (!Name) {
        return res.status(400).json({ error: 'Please provide a search query.' });
      }
  
      const suppliers = await Supplier.find({
        $or: [
          { name: { $regex: Name, $options: 'i' } },
          { phone: { $regex: Name, $options: 'i' } },
          { email: { $regex: Name, $options: 'i' } }
        ]
      })
      .populate('items');
  
      if (suppliers.length === 0) {
        return res.status(404).json({ message: 'No suppliers found.' });
      }
  
      res.status(200).json(suppliers);
  
  };
  
  module.exports = {
    searchSupplier,
  };
  
module.exports = { getAllSuppliers,getSupplierById,createSupplier,UpdateSupplier,deleteSupplier,searchSupplier};
