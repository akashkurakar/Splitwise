exports.addParticipant = async (req, res) => {
  const participant = req.body;
  try {
    let result = await participantService.addParticipant(groupObj);
    res.json(result);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
  res.end();
};
exports.getParticipant = async (req, res) => {
  const groupId = req.query.id;
  try {
    let result = await participantService.getParticipant(groupId);
    res.json(result);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
  res.end();
};
