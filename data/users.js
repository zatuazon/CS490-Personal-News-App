const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

async function createUser(firstName, lastName, userName, email, password){
    if(!firstName) throw "First name must to be provided";
    if(!lastName) throw "Last name must to be provided";
    if(!userName) throw "Username must to be provided";
    if(!email) throw "Email must to be provided";
    if(!password) throw "Password must to be provided";

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(String(email).toLowerCase())) throw "Please provide a valid emial";
    const userlists = await this.getAll();

    userlists.forEach(x => {
        if(userName === x.userName) throw `This username is taken`;
        if(email === x.email) throw `This email is already in use`;
    });

    const userCollection = await users();
    const hashpw = await bcrypt.hash(password, 2);
    let newUser = {
        _id:uuid.v4(),
        firstName:firstName,
        lastName:lastName,
        userName:userName,
        email:email,
        password: hashpw
    };
    const insertInfo = await userCollection.insertOne(newUser);
    if (insertInfo.insertedCount === 0) throw 'Could not add user';

    const newId = insertInfo.insertedId;
    const nu = await this.getUserById(newId.toString());
    nu._id = nu._id.toString();
    return nu;
}

    async function getAll(){
        const userCollection = await users();
        const userlist = await userCollection.find({},{projection:{_id:1,}}).toArray();
        return userlist;
    }
    
    async function getUserById(id){
        if(!id) throw `Please provide the ID`;
        if(typeof id !== 'string') throw `Invalid ID, must be a string`;
        if(id.trim().length===0) throw `String provided is empty`;
        const userCollection = await users();
        const user = await userCollection.findOne({_id:id});
        if(!user) throw `User not found`;
        return user;
    }


module.exports = {
    createUser,
    getUserById,
    getAll
};