import { Router } from 'express';
import passport from 'passport'; 
const router = Router(); 

 
import UserController from '../controllers/user.controller.js';
const userController = new UserController(); 

router.post("/register", userController.register); 
router.post("/login", userController.login); 
router.get("/current", passport.authenticate("jwt", {session: false}), userController.current); 
router.post("/logout", userController.logout); 

router.get('/google' , passport.authenticate('google',{scope:['email', 'profile']}), async(req,res) =>{
});

router.get('/googlecallback', passport.authenticate('google',{session:false, failureRedirect:'/login'}), userController.googleCallback);


export default router;