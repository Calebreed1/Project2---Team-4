var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var db = require("../models");

module.exports = function(app) {
// Create all our routes and set up logic within those routes where required.
app.get("/", function(req, res) {

    res.render("index");

});

app.get("/calendars", function(req, res) {
  res.render("calendar");
  // calendar.selectAll(function(data) {
  //   var hbsObject = {
  //     calendars: data
  //   };
  //   console.log(hbsObject);
  //   res.render("calendar", hbsObject);
  // });
});

app.post("/api/calendars", function(req, res) {
  console.log(req.body);
  db.calendars.create(
    {
    Event_Type: req.body.type,
    Event_Name: req.body.name,
    Event_Start_Date: req.body.start_date,
    Event_Info: req.body.info,
    Event_Location: req.body.location,
    User_Id: req.body.userid
    })
    .then(function(result) {
    // Send back the ID of the new quote
    res.json(result);  //{ id: result.insertId }
  });
});

app.put("/api/calendars/:id", function(req, res) {
  var condition = "id = " + req.params.id;  console.log("condition", condition);
  calendar.updateOne({
    Event_Start_Date: req.body.newStartDate
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

app.delete("/api/calendar/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  calendar.deleteOne(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });


});

}