'use strict';

var path = require('path');

module.exports = function (router) {
  router.route('/')
  .get(function (req, res) {
    res.sendFile(path.join(__dirname, '../admin/admin.html'));
  })
}
