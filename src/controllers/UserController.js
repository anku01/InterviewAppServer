import mongoose from 'mongoose';
import UserModel from '../models/UserModel';

// const userController ={};

// userController.signIn = (req, res) => {
//   console.log("data receive");
//     let email = req.body.email;
//     console.log(email);
//     UserModel.findOne({ email: email }).then(function (data) {
//       console.log(data);
//       // checking for Admin User
//       if (data!= null && data.role=="admin") {
//         if(!req.body.password)
//           res.send({UserModel:"Admin"});
//         else{
//             if(data.password==req.body.password){
//               res.send("authenticated");
//             }else{
//               res.send("Authentication Failed");
//             }
//         }
//       }else{
//         // saving Guest User
//         var userData={
//           // _id:new mongoose.Types.ObjectId(),
//           email:req.body.email,
//           contact:req.body.contact
//         }
//         let newUser = new UserModel(userData);
//         newUser.save((err, data) => {
//           if (err) {
//             res.send(err);
//           }
//           res.send({user:"candidate"});
//         });
//       }
//     })
//   }
let userController = {
  signInAdmin: (req, res) => {
    console.log(req.body,"signInAdmin");
    let email = req.body.email;
    let password = req.body.password;
    UserModel.findOne({ email: email, password: password, role: 'admin' }).then(function (data) {
      console.log(data);
      if (data) {
        res.send(data);
      }
      else {
        res.send(data);
      }
    })

  },
  signInCandidate: (req, res) => {
    let email = req.body.email;
    let contact = req.body.contact;
    UserModel.findOne({ email: email, contact: contact }).then(function (data) {
      if (data) {
        res.send(data);
      }
      else {
        var userData={
                    email: req.body.email,
                    contact: req.body.contact,
                    candidateIP: req.body.candidateIP || "",
                    loginDate: req.body.loginDate
                  }
        let newUser = new UserModel(userData);
        newUser.save((err, data) => {
          if (err) {
            res.send(err);
          }else{
            res.send(data);
          }
          
        });

      }



    })
  }
}
export default userController;
