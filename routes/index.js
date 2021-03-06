var express = require('express');
var router = express.Router();
var fs = require('fs');
const shell = require('shelljs');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.status(200).send("SpoCam Agent running. v 1.0.0")
});

router.post('/camera', function (req, res, next) {
  const streamName = req.body.command.cmdPayload.stream.name
  const cmd = req.body.command.cmd
  if (cmd == "startStream") {
    const exec = require("child_process").exec
    exec("~/bin/startpistreamsession.sh " + streamName, (error, stdout, stderr) => {
      if (error) {
        console.log('Error', error)
        res.json(stdout);
      } else if (stderr) {
        console.log('Error', stderr)
        res.json(stderr);
      } else {
        res.json(stdout);
      }   //do whatever here
    })
  } else if (cmd == "stopStream") {
    const exec = require("child_process").exec
    exec("~/bin/stoppistreamsession.sh " + streamName, (error, stdout, stderr) => {
      if (error) {
        console.log('Error', error)
        res.json(stdout);
      } else if (stderr) {
        console.log('Error', stderr)
        res.json(stderr);
      } else {
        res.json(stdout);
      }   //do whatever here

    })
  }
})

router.post('/preview', function (req, res) {
  const cmd = req.body.command.cmd
  const streamName = req.body.command.cmdPayload.stream.name
  if (cmd == "startPreview") {
    const exec = require("child_process").exec
    exec("~/bin/startpicamsession.sh " + streamName, (error, stdout, stderr) => {
      if (error) {
        console.log('Error', error)
        //res.json({statusCode:200});
        res.json(stdout);
      } else if (stderr) {
        console.log('Error', stderr)

        res.json(stderr);
      } else {
        res.json({ statusCode: 200 });
      }   //do whatever here
    })
  } else {
    const exec = require("child_process").exec
    exec("~/bin/stoppicamsession.sh " + streamName, (error, stdout, stderr) => {
      if (error) {
        console.log('Error', error)
        res.json(stdout);
      } else if (stderr) {
        console.log('Error', stderr)
        res.json(stderr);
      } else {
        res.json(stdout);
      }   //do whatever here
    })
  }
})
router.post('/rec', function (req, res, next) {

  const cmd = req.body.command.cmd
  if (cmd === "startRec") {
    const exec = require("child_process").exec
    exec("touch ~/picam/hooks/start_record", (error, stdout, stderr) => {
      if (error) {
        console.log('Error', error)
        res.json(stdout);
      } else if (stderr) {
        console.log('Error', stderr)
        res.json(stderr);
      } else {
        res.json(stdout);
      }   //do whatever here
    })
  } else if (cmd === "stopRec") {
    const exec = require("child_process").exec
    exec("touch ~/picam/hooks/stop_record", (error, stdout, stderr) => {
      if (error) {
        console.log('Error', error)
        res.json(stdout);
      } else if (stderr) {
        console.log('Error', stderr)
        res.json(stderr);
      } else {
        res.json(stdout);
      }   //do whatever here
    })
  }

})

router.get('/ack', function (req, res, next) {

  var response = {
    "camera": {
      "name": "Cam1",
      "ip": "10.0.0.230",
      "sysTime": "Tue Jul 31 15:24:21 CDT 2018"
    }
  }
  res.status(200).json(response)

})

router.post('/graphics', function (req, res) {
  var text = req.body.graphics.text
  var font = req.body.graphics.fontFamily
  var fontSize = req.body.graphics.fontSize
  var element = req.body.graphics.element
  var content = ""
  content = content + "text="+ text + "\nfont_name="+ font +"\npt=" + fontSize
  if (element === "timer") {
    fs.writeFile('./graphics/timer', content, function (err) {
      if (err) throw err;
    
      const exec = require("child_process").exec
      exec("cat ./graphics/timer > ~/picam/hooks/subtitle", (error, stdout, stderr) => {
        if (error) {
          console.log('Error', error)
          res.json(stdout);
        } else if (stderr) {
          console.log('Error', stderr)
          res.json(stderr);
        } else {
          res.json(stdout);
        }   //do whatever here
      })
    });
  }

})
module.exports = router;
