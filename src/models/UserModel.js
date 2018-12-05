import mongoose from 'mongoose';
const User = mongoose.Schema;

const UserSchema = new User({
  // _id: Schema.Types.ObjectId,
  role:{
    type:String,
    default:"candidate",
  },
  email:{
    type:String,
    required:"User ID required",
  },
  password:{
    type:String,
    default:null,
  },
  contact:{
    type:String,
    default:"contact required",
  },

},{collection:'User'});

let UserModel = mongoose.model('User', UserSchema);
export default UserModel;