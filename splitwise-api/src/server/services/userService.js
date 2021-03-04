
 'use strict';
 const db = require('../models/usermodel')
 const bcrypt = require('bcrypt');
 const saltRounds = 10;
 const salt = bcrypt.genSaltSync(saltRounds);
 class UserService{
   
     SignUp =async(user)=>{
            try{
                let search = await db.find(user);
                if(search.length==0){
                    let users = await db.add(user);
                    user = await db.find(user);
                    return user;
                }else{
                    return "User already present";
                }
                
            }catch(e){
                console.log(e);
            }
    }

    update =async(user)=>{
        try{
            let search = await db.update(user);
            if(search.length==0){
                return "User updation failed";
            }else{
                return search[0];
                
            }
            
        }catch(e){
            console.log(e);
        }
}

     Login=async(user)=>{
        try{
            let search = await db.find(user);
           
            if(search.length===0){
                return "Invalid credentials";
                
            }else{
                //var password = bcrypt.hashSync(user.password, salt);
                if(search[0].email==user.email && bcrypt.compareSync(user.password, search[0].password)){
                return search[0];
            }else{
                return "Invalid credentials";
            }
        }
            
        }catch(e){
            console.log(e);
        }
    }
    getUser=async(user)=>{
        try{
            let search = await db.findAll(user);
            if(search.length==0){
                return "Something went wrong";
            }else{
                return search[0];
                
            }
            
        }catch(e){
            console.log(e);
        }
    }
    getUserByEmail=async(user)=>{
        try{
            let search = await db.findByEmail(user);
            if(search.length==0){
                return "Something went wrong";
            }else{
                return search[0];
                
            }
            
        }catch(e){
            console.log(e);
        }
    }
    getUsers =async()=>{
        try{
            let search = await db.findAll();
            if(search.length==0){
                return "Something went wrong";
            }else{
                return search;
                
            }
            
        }catch(e){
            return e;
        }
    }
}





module.exports = UserService;