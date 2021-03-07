'use strict';
const activityDb = require('../models/ActivityModel');

class ActivityService{
    getActivities =async(user)=>{
        try{
            let search = await activityDb.getUserActivities(user);
                return search;
           
        }catch(e){
            console.log(e);
        }
    }

addActivity = async(description,grpName,user)=>{
    try{
        let search = await activityDb.addActivity(description,grpName,user);
            return search;
       
    }catch(e){
        console.log(e);
    }
}
}

module.exports =ActivityService
