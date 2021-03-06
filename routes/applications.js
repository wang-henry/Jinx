"use strict";

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const websiteLogo = require( 'website-logo' )

// DB imports
const { mongoose } = require("../db/mongoose");

const router = express.Router();
const { Posting } = require("../models/Posting");
const { Company } = require("../models/Company");
const { User, Notification } = require("../models/User");
const { Application } = require("../models/Application");
const { ObjectID } = require("mongodb"); // To validate object IDs

const { isMongoError, mongoChecker } = require("./utils");

mongoose.Promise = global.Promise;

//
// {
// 	"userId": "60708b04474d902ca7ea6d2c",
//  "company": "Facebook",
// 	"role": "Software Engineering Intern",
//  "status": "Wishlist"
// }
//

router.post('/', mongoChecker, (req, res, next) => {
	const application = new Application({
    userId: req.session.user,
    company: req.body.company,
    role: req.body.role,
    status: req.body.status,
  })


  const notification = new Notification({
    name: req.session.name,
    type: req.body.status,
    company: req.body.company,
  });

  // User.findOneAndUpdate({_id: req.session.user}, { "$push": { feed: notification }}, {new: true, useFindAndModify: false});

  application.save().then((result) => {
    User.findOneAndUpdate({_id: req.session.user}, { "$push": { feed: notification }}, {new: true, useFindAndModify: false})
    .then(() => {
      res.send(result);
    });
  }).catch((error) => {
    if (isMongoError(error)) {
      res.status(500).send('Internal server error')
    } else {
      res.status(400).send('Bad Request')
    }
  })
})

router.get('/', mongoChecker, (req, res) => {
  Application.find({userId: req.session.user}).populate({ path: "userId", model: User })
    .then((application) => {
      if (!application) {
        res.status(404).send("App Not Found");
      } else {
        res.send(application);
      }
    });
})

// Get application in db with spp id
router.get('/single/:id', mongoChecker, (req, res) => {
  Application.findOne({_id: req.params.id}).populate({ path: "userId", model: User })
    .then((application) => {
      if (!application) {
        res.status(404).send("App Not Found");
      } else {
        res.send(application);
      }
    });
})

router.patch('/:id', mongoChecker, (req, res, next) => {
  try {
    const promiseLogo = () => {
			return new Promise((resolve, reject) => {
				websiteLogo( req.body.link, function( error, info ) {
					if (!info) {
            resolve(null);
          } else {
            if (info.openGraph && info.openGraph.length > 0) {
              if (info.openGraph[0].href) {
                resolve(info.openGraph[0].href);
              }
            }
          }
				})
			})
		}
	
		const fetchLogo = async () => {
			const result = await promiseLogo();
			return result;
    }
    

		fetchLogo().then(function(result) {
			Application.findOneAndUpdate({_id: req.params.id}, {$set: {... req.body, companyLogo: result }})
      .then((application) => {
        if (!application) {
          res.status(404).send("App Not Found");
        } else {
          const notification = new Notification({
            name: req.session.name,
            type: req.body.status,
            company: req.body.company,
          });
          User.findOneAndUpdate({_id: req.session.user}, { "$push": { feed: notification }}, {new: true, useFindAndModify: false})
          .then(() => {
            res.send(application);
          });
        }
      });
			})
  } catch (e) {
    next(e)
  }
})

// Delete all applications in db
router.delete("/", mongoChecker, (req, res) => {
  Application.remove({}).then((application) => {
    if (!application) {
      res.status(404).send("Application Not Found");
    } else {
      res.send(application);
    }
  });
});



module.exports = router;
