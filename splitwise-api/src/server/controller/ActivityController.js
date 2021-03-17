const ActivityService = require("../services/ActivityService");

let activityService = new ActivityService();
exports.getActivities = async (req, res) => {
  const user = req.query;
  try {
    let groups = await activityService.getActivities(user);
    res.json(groups);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
  res.end();
};

exports.getActivitiesByGroup = async (req, res) => {
  const group = req.query.groupid;
  const user = req.query.userid;
  try {
    let groups = await activityService.getActivitiesByGroup(group, user);
    res.json(groups);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
  res.end();
};
