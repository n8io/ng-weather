var path = require('path');
var express = require('express');
var statics = require('serve-static');
var request = require('request');
var app = express();

app.use(statics(path.join(__dirname, '../client'), {index:false}));

app.get('/api/weather', function(req, res){
  var options = {
    uri: 'https://api.forecast.io/forecast/5c0ddaf4144cc03f4d5c857e20584f4c/37.8267,-122.423',
    json: true
  };
  request(options, function(err, resp){
    res.status(200).json(resp.body.daily);
  });
});

app.get('*', function(req, res, next){
  if(!req.accepts('html')) {
    return next();
  }
  return res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.get('*', function(req, res) {
  res.status(404);

  if(req.accepts('json')){
    return res.json({message:'Resource not found'});
  }

  return res.send('404 Resource not found.');
});

var port = process.env.PORT || 3000;
var ip = process.env.IP || '0.0.0.0';

var server = app.listen(port, ip, function (){
  var host = server.address().address;
  var port = server.address().port;

  console.log('App running at http://%s:%s', host, port)
});