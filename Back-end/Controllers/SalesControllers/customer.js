const { StatusCodes } = require('http-status-codes');
const Customer = require('../../models/Sale/Customer'); 



const addCustomer = async (req,res) => {
    const myNewCustomer=await Customer.create(req.body)
    res.status(StatusCodes.OK).json(myNewCustomer)
  }

  
const getAllCustomer=async(req,res)=>{
    const AllCustomer=await Customer.find({})
    res.status(StatusCodes.OK).json({Customer:AllCustomer,lenght:AllCustomer.length})
  }

const getCustomerByID=async (req,res)=>{
    const {id}=req.params;
    if(!id){
      throw new BadRequestError("please provide Id")
    }
    const MyCustomer=await Customer.findOne({_id:id})
    res.status(StatusCodes.OK).json(MyCustomer);
  }


const Update = async (req, res) => {
    
        const { id } = req.params;
        const updates = req.body;

        const updatedCustomer = await Customer.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        });

        if (!updatedCustomer) {
            return res.status(404).json({ msg: "Customer not found" });
        }

        res.status(200).json({ customer: updatedCustomer }); 
    
};

const Edit = async (req, res) => {
    
        const { id } = req.params;
        const updates = req.body;

        const editedCustomer = await Customer.findByIdAndUpdate(id, { $set: updates }, {
            new: true,
            runValidators: true,
        });

        if (!editedCustomer) {
            return res.status(404).json({ msg: "Customer not found" });
        }

        res.status(200).json({ customer: editedCustomer });
};

const Delete = async (req, res) => {
    
        const { id } = req.params;

        const deletedCustomer = await Customer.findByIdAndDelete(id);

        if (!deletedCustomer) {
            return res.status(404).json({ msg: "Customer not found" });
        }

        res.status(200).json({ msg: "Customer deleted successfully" });
    
    
};

module.exports = {
    addCustomer,
    getAllCustomer,
    getCustomerByID,
    Update,
    Edit,
    Delete,
};
