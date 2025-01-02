const { StatusCodes } = require('http-status-codes');
const Unit = require('../../models/Store/units');
const { BadRequestError } = require('../../errors');

const getAllUnits = async (req, res) => {
  if(req.user.role !== 'admin' && req.user.role !== 'warehouse_personnel') {
    throw new BadRequestError('Access Denied');
  }
        const units = await Unit.find({});

        if (units.length === 0) {
            return res.status(404).json({ message: "No units found." });
        }

        res.status(200).json({unit: units });
   
};

  const createUnit = async (req, res) => {

        
       
        const createdUnit = await Unit.create(req.body);
        res.status(StatusCodes.OK).json({createdUnit})
  }
     
 const getUnitById = async (req, res) => {
  if(req.user.role !== 'admin' && req.user.role !== 'warehouse_personnel') {
    throw new BadRequestError('Access Denied');
  }
        const id = req.params.id;
        try {
            const unit = await Unit.findById(id);
    
            if (!unit) {
                return res.status(404).json({ message: "Unit Not Found." });
            }
    
            res.status(200).json({ unit });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'An error occurred while fetching the unit.' });
        }
    };

    const deleteUnitById = async (req, res) => {
      if(req.user.role !== 'admin' && req.user.role !== 'warehouse_personnel') {
        throw new BadRequestError('Access Denied');
      }
        const { id } = req.params;
      
        const DeletableUnit = await Unit.findById({ _id: id });
        if (!DeletableUnit || !id) {
          throw new BadRequestError("Please provide a valid ID");
        }
      
        await Unit.findOneAndDelete({ _id: id });
        res.status(StatusCodes.OK).json({ Deleted: true });
      };
    
    const updateUnitById = async (req, res) => {
      if(req.user.role !== 'admin' && req.user.role !== 'warehouse_personnel') {
        throw new BadRequestError('Access Denied');
      }
        const { id } = req.params;
        console.log("🚀 ==> file: unit.js:28 ==> updateUnitById ==> id:", id);
      
        const updateData = req.body;
      
        const UpdatableUnit = await Unit.findOne({ _id: id });
        console.log("🚀 ==> file: unit.js:31 ==> updateUnitById ==> UpdatableUnit:", UpdatableUnit);
      
        if (!UpdatableUnit || !id) {
          throw new BadRequestError("Please provide a valid ID");
        }
      
        const UpdatedUnit = await Unit.findOneAndUpdate({ _id: id }, updateData, {
          new: true,
          runValidators: true
        });
      
        res.status(StatusCodes.OK).json(UpdatedUnit);
      };

const searchUnit = async (req, res) => {
  if(req.user.role !== 'admin' && req.user.role !== 'warehouse_personnel') {
    throw new BadRequestError('Access Denied');
  }

        const {Name}  = req.body;
        console.log("🚀 ==> file: units.js:77 ==> searchUnit ==> req.body:", req.body);

    
        if (!Name) {
          return res.status(400).json({ error: 'Please provide a search query.' });
        }
    
        const units = await Unit.find({
          $or: [
            { UnitName: { $regex: Name, $options: 'i' } },
            { UnitAbreviation: { $regex: Name, $options: 'i' } }
          ]
        });
    
        if (units.length === 0) {
          return res.status(404).json({ message: 'No units found.' });
        }
    
        res.status(200).json(units);
    
    };
module.exports = { getAllUnits,getUnitById,createUnit,updateUnitById ,deleteUnitById,searchUnit};  







