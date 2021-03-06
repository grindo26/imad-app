var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=  require("pg").Pool;

var config = {
    user: 'pratiksangle6',
    database: 'pratiksangle6',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var articles= {
    'article-one': {
    title: 'Article-one',
    heading: 'Article 1',
    date: 'Sep 5, 2016',
    content: ` <p>Hello. This is my content.</p>
            <p> The Premier League has been operating under the current transfer window paradigm since 2002 — introduced as a part of an agreement with the European Commission to align on the movement of football players without undermining the integrity of competitions (transfers used to be allowed all the way through March 31st) — but starting next season, the Premier League will shorten the summer transfer window. Like this year, for the past 15 years, the summer window closed on August 31st (or thereabouts depending on any holidays), but starting next year, it will close on the Thursday before the start of the season. Transfer Deadline Day will no longer by on August 31st but rather in early or mid-August, depending on the start of the season — August 9th in 2018, for example.
                Calls to change that system have been growing for a while, and the matter was finally put to a vote today, passing just barely with the minimum of 14 votes (of the 20 Premier League teams) required.</p>`
    
},
    'article-two': {
        title: 'Article-two',
    heading: 'Article 2',
    date: 'Sep 10, 2016',
    content: ` <p>Hello. This is my content.</p>
            <p> The Premier League has been operating under the current transfer window paradigm since 2002 — introduced as a part of an agreement with the European Commission to align on the movement of football players without undermining the integrity of competitions (transfers used to be allowed all the way through March 31st) — but starting next season, the Premier League will shorten the summer transfer window. Like this year, for the past 15 years, the summer window closed on August 31st (or thereabouts depending on any holidays), but starting next year, it will close on the Thursday before the start of the season. Transfer Deadline Day will no longer by on August 31st but rather in early or mid-August, depending on the start of the season — August 9th in 2018, for example.
                Calls to change that system have been growing for a while, and the matter was finally put to a vote today, passing just barely with the minimum of 14 votes (of the 20 Premier League teams) required.</p>`
    
    },
    'article-three': {
        title: 'Article-three',
    heading: 'Article 3',
    date: 'Sep 15, 2016',
    content: ` <p>Hello. This is my content.</p>
            <p> The Premier League has been operating under the current transfer window paradigm since 2002 — introduced as a part of an agreement with the European Commission to align on the movement of football players without undermining the integrity of competitions (transfers used to be allowed all the way through March 31st) — but starting next season, the Premier League will shorten the summer transfer window. Like this year, for the past 15 years, the summer window closed on August 31st (or thereabouts depending on any holidays), but starting next year, it will close on the Thursday before the start of the season. Transfer Deadline Day will no longer by on August 31st but rather in early or mid-August, depending on the start of the season — August 9th in 2018, for example.
                Calls to change that system have been growing for a while, and the matter was finally put to a vote today, passing just barely with the minimum of 14 votes (of the 20 Premier League teams) required.</p>`
    
    }
};


function createTemplate (data) {
var title = data.title;
var date = data.date;
var heading= data.heading;
var content= data.content;
var htmlTemplate= 
`<html>
    <head>
        <title>
            ${title}
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
    </head>
    <body>
        <div>
            <a href="/">Home</a>
        </div>    
        <hr/>
        <h3>
            ${heading}
        </h3>
        <div>
            ${date.toDateString()}
        </div>
        <div>
            ${content}
        </div>           
    </body>
</html>`;
return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/test-db', function(req, res){
 //make a select request
 //return a response
    pool.query('SELECT * FROM test', function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }
        else
        {
            res.send(JSON.stringify(result.rows));
        }   
    });
});

var counter=0;

app.get('/counter', function(req, res){
    counter=counter+1;
    res.send(counter.toString());
});

var names=[];
app.get('/submit-name', function (req, res) {
    var name= req.query.name;
    names.push(name);
    
    res.send(JSON.stringify(names));
});


app.get('/articles/:articleName', function(req,res){
    pool.query("SELECT * FROM article WHERE title= '" + req.params.articleName + "'", function(err, result){
      if (err){
        res.status(500).send(err.toString());
        } else {
            if(result.rows.length === 0){
                res.status(404).send('Article Not Found');
            } else {
                var articleData = result.rows[0];
                res.send(createTemplate(articleData));
            }
        } 
    }); 
});




app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});





// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
