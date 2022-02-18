const db = require("../models");
const Team = db.teams;

exports.create = (req, res) => {
    if (!req.body.TeamName) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }
    
      const team = new Team({
        TeamName: req.body.TeamName,
        TeamNationality: req.body.TeamNationality,
        NumberOfPlayers: req.body.NumberOfPlayers,   
        published: req.body.published ? req.body.published : false
      });
     
      team
        .save(team)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while registering the Team."
          });
        });
    
};

exports.findAll = (req, res) => {
  const TeamName = req.query.TeamName;
  var condition = TeamName ? { TeamName: { $regex: new RegExp(TeamName), $options: "i" } } : {};
  Team.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error occurd retriving the teams."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Team.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found team with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving team with id=" + id });
    });
};
// Update by id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const id = req.params.id;
  Team.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update team with id=${id}. Maybe team was not found!`
        });
      } else res.send({ message: "team was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating team with id=" + id
      });
    });
};
// Delete by id
exports.delete = (req, res) => {
  const id = req.params.id;
  Team.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Team with id=${id}. Maybe the Team was not found!`
        });
      } else {
        res.send({
          message: "team was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Team with id=" + id
      });
    });
};
// Delete all
exports.deleteAll = (req, res) => {
    Team.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Teams were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all teams."
      });
    });
};
// Find all published 
exports.findAllPublished = (req, res) => {
  Team.find({ published: true })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving teams."
    });
  });
};
