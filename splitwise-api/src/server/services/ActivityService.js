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

  addActivity = async (description, user, grp_name) => {
    try {
      let search = await activityDb.addActivity(description, user, grp_name);
      return "User added successfully";
    } catch (e) {
      return e;
    }
  };

  getActivitiesSortLast = async (user) => {
    try {
      let search = await activityDb.getUserActivitiesLast(user);
      return "User added successfully";
    } catch (e) {
      return e;
    }
  };

  getActivitiesByGroup = async (groupId, user) => {
    try {
      let search = await activityDb.getActivitiesByGroup(groupId, user);
      return search;
    } catch (e) {
      return e;
    }
  };
}

module.exports = ActivityService;
