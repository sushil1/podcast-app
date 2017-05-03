var express = require('express')
var router = express.Router()
var superagent = require('superagent')
var xml2js = require('xml2js')


router.get('/', function(req, res, next){

    //use supergent to search api for itunes
    var url = req.query.url
    if(url == null){
      res.json({
        confirmation:'fail',
        message:'missing feed url'
      })
      return
    }

    superagent
      .get(url)
      .query(null)
      .accept('application/json')
      .end(function(err, response){
        if(err || !response.ok){
          res.json({
            confirmation:'fail',
            message: err
          })
          return
        }

        var xml = response.text
        //console.log('response '+JSON.stringify(response))
        if(xml == null){
          console.log('TEST 1: response is null from the feed ')
          return
        }
        xml2js.parseString(xml, function(err, result){
          var rss = result.rss
          var channel = rss.channel
          if(channel.length > 0)
          channel = channel[0]

          res.json({
            confirmation:'success',
            podcast:channel
          })
        })
      })

})

module.exports = router
