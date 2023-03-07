import express from 'express';
import hasha from 'hasha';
import nodemailer from 'nodemailer';
import escape from 'escape-html';

import config from '../config.js';
import db from '../db/index.js';

const router = express.Router();

function deleteChildComments(id) {
  db.comments.findByParent(id)
    .then(comments => {
      for (let comment of comments) {
        db.comments.delete(comment.id);
      }
    })
}

router.post('/',
  (req, res, next) => {
    console.log("New Comment Time");
    const uid = req.user.id;
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    if (!req.body.parent_id || !req.body.body) {
      res.status(400);
      res.send('error');
      return;
    }
    db.comments.add({
      id: hasha(req.body.body + uid + date, {algorithm: 'md5'}),
      parent_id: req.body.parent_id,
      uid,
      body: req.body.body,
      date,
    })
    .then(data => {
      console.log("WE BALL");
      res.status(200);
      res.send('success');
    })
    .catch(error => {
      res.status(500);
      console.log("FUCKFUCKFCUKFUCKFCUKFCUK")
      console.log(error);
      res.send('error');
    });
  }
);

router.delete('/',
  (req, res, next) => {
    const user = req.user._json.sub;
    const id = req.body.id;
    if (!id) {
      res.status(400);
      res.send('Did not pass comment ID');
    }
    db.comments.find(id)
      .then(comment => {
        if (user === comment.uid || config.admins.includes(user)) {
          deleteChildComments(id);
          db.comments.delete(id)
            .then(result => {
              console.log(result);
              if (result) {
                res.status(200);
                res.send('success');
              }
            })
            .catch(error => {
              res.status(500);
              res.send('Could not delete comment');
              console.log(error);
            })
        } else {
          res.status(403);
          res.send('Not permitted to delete comment');
        }
      })
      .catch(error => {
        res.status(500);
        res.send('Could not delete comment');
        console.log(error);
      })
  }
);

export default router;
