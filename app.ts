import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import dbConnect from './db';
import userRoutes from './src/app/user/routes/user';
import orgRoutes from './src/app/user/routes/organization';
import studentsRoutes from './src/app/user/routes/student';
import teachersRoutes from './src/app/user/routes/teacher';
import authRoutes from './src/app/authentication/routes/authentication'


dotenv.config();
const PORT = process.env.PORT;
const DBURL: any = process.env.DBURL;
const app = express();

app.use(bodyParser.json());
app.use(cors());

// routes
app.use('/v1/api', userRoutes)
app.use('/v1/api/org',orgRoutes )
app.use('/v1/api/students', studentsRoutes)
app.use('/v1/api/teachers', teachersRoutes)
app.use('/v1/api/auth', authRoutes)

app.listen(PORT, async() => {
     await dbConnect(DBURL);
    console.log(`server is runing on port ${PORT}`);
    
})