"use strict";
const activityDb = require("../models/ActivityModel");

class ActivityService {
  getActivities = async (user) => {
    try {
      let search = await activityDb.getUserActivities(user);
      return search;
    } catch (e) {
      console.log(e);
    }
  };

  addActivity = async (description, user) => {
    try {
      let search = await activityDb.addActivity(description, user);
      return "User added successfully";
    } catch (e) {
      return e;
    }
  };
}

module.exports = ActivityService;
