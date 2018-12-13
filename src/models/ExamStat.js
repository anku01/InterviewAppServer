import mongoose from 'mongoose';
var Schema = mongoose.Schema;

const ExamStatSchema = new Schema({
  // _id: Schema.Types.ObjectId,
  
  question:{
    type: Schema.Types.Mixed
  }
  


});

export default ExamStatSchema;