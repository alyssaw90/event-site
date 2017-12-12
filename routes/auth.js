'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');
const uuid = require('uuid');
let tasks = [];

module.exports = function(router, passport) {
    router.route('/api/tasks')
        .post(passport.authenticate('oauth-bearer', {
            session: false
        }), function(req, res) {
            if (!req.body.Description) {
                res.status(400).send('Please provide a task description');
                return;
            }
            var task = {
                "ID": uuid.v4(),
                "Description": req.body.Description,

                // Access user info in the token via passport's user object
                "Owner": req.user.sub,
            };
            tasks.push(task);
            console.log('Task ' + task.ID + ' created.');
            res.json(task);
        })
        .get(passport.authenticate('oauth-bearer', {
            session: false
        }), function(req, res) {
            res.json(tasks.filter(function(task) {
                return task.Owner == req.user.sub;
            }));
        });

    router.route('/api/tasks/:task_id')
        .get(passport.authenticate('oauth-bearer', {
            session: false
        }), function(req, res) {
            var task = tasks.find(function(task) {
                return task.ID == req.params.task_id;
            });
            if (typeof(task) === 'undefined') {
                res.status(404).send('Can\'t find that task...');
            } else if (task.Owner != req.user.sub) {
                res.status(403).send('Forbidden...');
            } else {
                res.json(task);
            }
        })
        .put(passport.authenticate('oauth-bearer', {
            session: false
        }), function(req, res) {
            if (!req.body.Description) {
                res.status(400).send('Please provide a task description');
                return;
            }

            var task = tasks.find(function(task) {
                return task.ID == req.params.task_id;
            });

            if (typeof(task) === 'undefined') {
                res.status(404).send('Can\'t find that task...');
            } else if (task.Owner != req.user.sub) {
                res.status(403).send('Forbidden...');
            } else {
                task.Description = req.body.Description;
                console.log('Task ' + task.ID + ' updated.');
                res.json(task);
            }
        })
        .delete(passport.authenticate('oauth-bearer', {
            session: false
        }), function(req, res) {
            var task = tasks.find(function(task) {
                return task.ID == req.params.task_id;
            });

            if (typeof(task) === 'undefined') {
                res.status(404).send('Can\'t find that task...');
            } else if (task.Owner != req.user.sub) {
                console.log(req.user.sub);
                console.log(task.Owner);
                res.status(403).send('Forbidden...');
            } else {
                tasks = tasks.filter(function(task) {
                    return task.ID != req.params.task_id;
                });
                console.log('Task ' + task.ID + ' deleted.');
                res.status(200).send();
            }
        });
};