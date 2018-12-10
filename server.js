const http = require('http')
const express = require('express')
const app = express();
var port = 8000;
var bingAPI = "https://api.cognitive.microsoft.com/bing/v7.0/images/search";
var axios = require('axios')
// var MongoClient = require('mongodb').MongoClient
var SearchQuery = require('./mongoose')
// app.set('view engine', 'pug')


app.get('/api/imagesearch/:query',function(req,res){
  var offset=0;
  var count=10;
  var url=bingAPI+"?q="+encodeURIComponent(req.params.query)+"&count=10"+(req.query.offset?"&offset="+req.query.offset:"");
  axios.get(url,{
           headers: {
           'Ocp-Apim-Subscription-Key': process.env.BAPI,
           'Accept': 'application/json'
           }})
    .then(function(response){
      var result = [];
      response.data.value.forEach(a=>{
        result.push({
          url: a.contentUrl,
          snippet: a.name,
          thumbnail: a.thumbnailUrl,
          context: a.hostPageUrl
        })
      })
      res.json(result);
      
  })
  
  var newQuery = new SearchQuery({
    term: req.params.query,
    when: new Date()
  });
  newQuery.save(function(err,result){
    if(err) throw err
    // console.log(result,' saved!')
  });
  
})

app.get('/api/imagesearch',function(req,res){
  SearchQuery.find({},'-_id -__v',function(err,results){
    if(err) throw err;

    res.json(results);
  });
})
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
