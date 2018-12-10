import express from "express";
import userController from "../controllers/UserController";

const router = express.Router();

router.get('/adminLogin',(req, res, next)=>{
  console.log("Response Received");
})
.post('/adminLogin',(req, res)=>{
  userController.signInAdmin(req,res);
})
.post('/candidateLogin',(req, res, next)=>{
    userController.signInCandidate(req,res);
  });
export default router;