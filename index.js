

var express = require('express');
var app = module.exports = express();

// error handler
function error(status, msg) {
  var err = new Error(msg);
  err.status = status;
  return err;
}

// little database

var books = [
  { title: 'Дети капитана Гранта' },
  { title: 'Двадцать тысяч лье под водой' },
  { title: 'Таинственный остров' }
];

// serving data

app.use('/api/books', function(req, res, next){
  res.send(books);
});


// error handling middleware.
app.use(function(err, req, res, next){
  res.status(err.status || 500);
  res.send({ error: err.message });
});

// custom JSON 404 middleware
app.use(function(req, res){
  res.status(404);
  res.send({ error: "Can't find that" });
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
