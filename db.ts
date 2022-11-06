import { connect } from "mongoose";

const dbConnect = async(DBURL: any) => {
    try {
      await connect(DBURL) 
      console.log('db connected successfully');
       
    } catch (error) {
        console.log('error while connecting database', error);
        
    }
}

export default dbConnect;