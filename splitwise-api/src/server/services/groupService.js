'use strict';
const grpDb = require('../models/groupmodel')
class GroupService{
   
    createGroup =async(group)=>{
           try{
               let search = await grpDb.find(group);
               if(search.length==0){
                   let groups = await grpDb.add(group);
                   return groups;
               }else{
                   return "Group already present";
               }     
           }catch(e){
               console.log(e);
           }
   }
}

module.exports = GroupService;