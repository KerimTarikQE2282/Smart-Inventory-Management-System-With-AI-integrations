require('express-async-errors');
const express=require('express')
const app=express();
require('dotenv').config()
//Routes
const auth=require('./Routes/Auth/auth')
const items=require('./Routes/Store/items')
const brand=require('./Routes/Store/brand')
const supplier=require('./Routes/Buy/supplier')
const SingleItemSale=require('./Routes/Sale/SingleItemSale')
const GeneralSales=require('./Routes/Sale/GeneralSale')
const OrderItem=require('./Routes/Sale/OrderItem')
const WareHouse=require('./Routes/Store/warehouse')
const WareHouseAdjustments=require('./Routes/Store/Inventory_Adjustments')
const unit=require('./Routes/Store/unit')
const category=require('./Routes/Store/category')
const store=require('./Routes/Store/store')
const customer =require('./Routes/Sale/Customer')
//middlewares
const errorhandler=require('./middleware/error-handler')
const notfound=require('./middleware/not-found')
const authermticationMiddleware=require('./middleware/authentication')
//packages
const connectDB=require('./db/connect')
const cors=require('cors')
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit=require('express-rate-limit')


//using packages
//app.use(rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 1000 ,
//     standardHeaders: 'draft-7',
//     legacyHeaders: false,
//   }));
  
app.use(express.json());
app.use(helmet())
app.use(xss())
app.use(cors())


//TODO authentication middleware is supposed to be added to the routes that have to be used after the user has logged in 
//routes
app.use('/api/v1',auth)
app.use('/api/v1/brands',brand)
app.use('/api/v1/supplier',supplier)
app.use('/api/v1/items',items)
app.use('/api/v1/SingleItemSale',SingleItemSale)
app.use('/api/v1/GeneralSales/',GeneralSales)
app.use('/api/v1/WareHouse/',WareHouse)
app.use('/api/v1/units/',unit)
app.use('/api/v1/WareHouseAdjustments/',WareHouseAdjustments)
app.use('/api/v1/unit',unit)
app.use('/api/v1/category',category)
app.use('/api/v1/stores',store)
app.use('/api/v1/WareHouseAdjustments/',WareHouseAdjustments)
app.use('/api/v1/customer/',customer)


//custom middlewares

app.use(notfound)
app.use(errorhandler)


const port=3002 || process.env.PORT;

const start=async ()=>{
    try {
        await connectDB(process.env.DATABASE_URL) 
        app.listen(port,()=>{
            console.log('server running on port ..... ',port) 
        }) 

    } catch (error) {
        console.log(error)
    }
}
start()