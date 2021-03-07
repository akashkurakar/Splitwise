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
}