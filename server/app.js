import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoute from './routes/user.js';
import authRoute from './routes/auth.js';
import productRoute from './routes/product.js';
import cartRoute from './routes/cart.js';

dotenv.config();
const PORT = 5000;

const app = express();

// check if NODE ENVIRONMENT is development or test
const string =
  process.env.NODE_ENV === 'test' ? process.env.dbURI_TEST : process.env.dbURI;
// connect to mongodb database
mongoose
  .connect(string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) =>
    app.listen(PORT, () => console.log(`Server Running and Db connected! `))
  )
  .catch((err) => console.log(err));

//  use cors origin and allow requests from anywhere or a specific port
app.use(
  cors({
    origin: '*',
  })
);

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.json());

// api route
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/product', productRoute);
app.use('/api/cart', cartRoute);

// api homepage
app.get('/api', (req, res) => res.send('Homepage'));

export default app;
