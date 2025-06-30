import dotenv from 'dotenv';
dotenv.config();

import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDatabase from './config/db.js';
import { userRouter } from './routes/userRouter.js';
import sellerRouter from './routes/sellerRouter.js';
import connectCloudinary from './config/cloud.js';
import productRoutes from './routes/productRouter.js';
import cartRoutes from './routes/cartRouter.js';
import addressRoutes from './routes/addressRouter.js';
import orderRoutes from './routes/orderRoutes.js';
import { stripeWebhooks } from './controllers/orderController.js';

const app = express();
const allowedOrigins = ['http://localhost:5173','https://groceries-teal.vercel.app'];
const port = process.env.PORT || 4000;


await connectDatabase();
await connectCloudinary();

app.post('/api/stripe/webhook',express.raw({type:'application/json'}),stripeWebhooks)

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.get('/', (req, res) => res.send("API is working"));
app.use('/api/users', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/products', productRoutes);
app.use('/api/user', cartRoutes);
app.use('/api/userAddress', addressRoutes);
app.use('/api/orders', orderRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
