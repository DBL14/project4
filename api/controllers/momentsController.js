var Moment = require("../models/moment");
var User = require("../models/user");

function momentsIndex(req, res){
  Moment.find({}, function(err, moments) {
    if (err) return res.status(404).send(err);
    res.status(200).send(moments);
  });
}

function momentsCreate(req, res){
  var moment = new Moment(req.body.moment);

  moment.save(function(err){
    if (err) return res.status(500).send(err);
    var id = req.body.moment.user_id;
    User.findById(id, function(err, user){
       user.moments.push(moment);
       user.save();
       return res.status(201).send(moment);
    });
  });
}

function momentsShow(req, res){
  var id = req.params.id;

  Moment.findById({ _id: id }, function(err, moment) {
    if (err) return res.status(500).send(err);
    if (!moment) return res.status(404).send(err);
    res.status(200).send(moment);
  });
}

function momentsUpdate(req, res){
  var id = req.params.id;

  Moment.findByIdAndUpdate({ _id: id }, req.body.moment, function(err, moment){
    if (err) return res.status(500).send(err);
    if (!moment) return res.status(404).send(err);
    res.status(200).send(moment);
  });
}

function momentsDelete(req, res){
  var id = req.params.id;

  Moment.remove({ _id: id }, function(err) {
    if (err) return res.status(500).send(err);
    res.status(200).send();
  });
}

module.exports = {
  momentsIndex:  momentsIndex,
  momentsCreate: momentsCreate,
  momentsShow:   momentsShow,
  momentsUpdate: momentsUpdate,
  momentsDelete: momentsDelete
};
