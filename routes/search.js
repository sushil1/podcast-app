const express = require('express');
const router = express.Router();
const superagent = require('superagent');

router.get('/:searchQuery', (req, res, next) => {
  const searchQuery = req.params.searchQuery;
  const URL = 'http://itunes.apple.com/search';

  superagent
    .get(URL)
    .query({ media: 'podcast', term: searchQuery })
    .set('Accept', 'application/json')
    .end((err, response) => {
      if (err) {
        res.json({
          confirmation: 'fail',
          message: err
        });
      }
      if (response == null) {
        res.json({
          confirmation: 'fail',
          message: 'Podcasts not found'
        });
      }
      const data = JSON.parse(response.text);
      res.json({
        confirmation: 'success',
        results: data.results
      });
    });
});

module.exports = router;
