import express from "express"
import {registerController, loginController} from '../controllers/authController.js'
import {requireSignIn} from "../middlewares/authMiddleware.js"

//router object
const router = express.Router() 

//routing 
//Register || method POST
router.post('/register', registerController)

//LOGIN || POST 
router.post('/login', loginController)

//protected route for user
router.get("/user-auth", requireSignIn, (req, res) =>{
    res.status(200).send({ok:true})
})


export default router