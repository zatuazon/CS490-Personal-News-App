const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const bcrypt = require('bcryptjs');
const xss = require('xss');

router.get('/', async (req,res)=>{
    console.log(req.session);
    res.sendFile(path.join(__dirname+'/index.html'));
    //if(!req.session.user){
        //res.render('index',{title:"index", haserror:false, haserror2:false,hidelogin:true,hidereg:false});
    //} else{
    //}
});

router.post('/login', async(res,req)=>{
    let logindata = req.body;
    let validuser = false;
    let user = {};
    let errors = [];

    if(!logindata.username) errors.push('Please enter a Username');
    if(!logindata.password) errors.push('Please enter a Password');
   
    const userlist = await userData.getAll();

    for (x of userlist){
        const hashpw = await bcrypt.compare(logindata.password, x.password);
        if(hashpw && x.userName===logindata.username){
            validuser= true;
            user = x;
        }
    }

    if(!validuser){
        errors.push('Username or password not correct');
    }
    if(errors.length>0){
        res.status(401).render('login',{errors:errors, haserror:true, title:'Log in', haserror2:false,hidelogin:true,hidereg:false});
        return;
    }

    try{
        req.session.user = user;
        res.redirect('/');
    } catch(e){
        console.log(e);
        res.status(500).json({error:e});
    }
});

router.post('/register', async(res,req)=>{
    let registerdata = req.body;

    if(!registedata.first) errors.push('Please enter a first name');
    if(!registedata.last) errors.push('Please enter a last name');
    if(!registedata.username) errors.push('Please enter a username');
    if(!registedata.email) errors.push('Please provide an email');
    if(!registedata.password1) errors.push('Please enter a password');
    if(!registedata.password2) errors.push('Please re-enter your password');
    if(registedata.password1!==registedata.password2) errors.push('The re-entered password does not match');

    if(errors.length>0){
        res.status(401).render('login',{errors:errors, haserror:false, title:'Log in', haserror2:true,hidelogin:false,hidereg:true});
        return;
    }
    try{
        const newuser = await userData.createUser(xss(registedata.first), xss(registedata.last), xss(registedata.username), xss(registedata.email), xss(registedata.password1));
        req.session.user = newuser;
        res.redirect('/');
    } catch(e){
        errors.push(e);
        res.status(401).render('login',{errors:errors, haserror:false, title:'Log in', haserror2:true,hidelogin:false,hidereg:true});
    }
});

module.exports = router;