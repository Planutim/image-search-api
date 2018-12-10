const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_DB_URI)

var db=mongoose.connection;
db.on('error',console.error.bind(console,'connection errror: '));
db.once('open', function(){

})

var searchSchema = new mongoose.Schema({
  term: String,
  when: Date
})

var SearchQuery = mongoose.model('Searchquery', searchSchema);

module.exports = SearchQuery;