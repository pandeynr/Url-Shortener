// Express is a helpful middleware framework for Node.js
const express = require('express');
// CORS allows one to skip AJAX's same-origin-policy
const cors = require('cors');
//bodyParser is required for Express v4 and further
const bodyParser = require('body-parser');
//Mongoose is how we shall acess our MongoDB 
const mongoose = require('mongoose');
//shortUrls is our filepath to our 'model'
const shortUrl = require('./models/shortUrl.js');

let app = express();
app.use(bodyParser.json());
app.use(cors());
//allows node to acess my html
app.use(express.static(__dirname + '/website'));

//creating our mongoDB
mongoose.connect('mongoDB://localhost/shortUrls')

app.get('/new/:url(*)', function(req, res, next){
    let url = req.params.url;
    console.log(url);
    let regex = /(www.)?(\w+\.\w+)(\/\w+)*/;
    if (regex.test(url) === true){
        let shortened = (Math.floor((Math.random()*9))).toString() + (Math.floor((Math.random()*9))).toString() +
        (Math.floor((Math.random()*9))).toString() + (Math.floor((Math.random()*9))).toString();
        
        let data = new shortUrl(
            {
                originalUrl: url,
                shorterUrl: shortened
            }
        );

        console.log(data);

        data.save(err =>{
            return res.send('Error saving to database...');
        });

        return res.json(data);
    }
});

app.get('./:url2', (req, res, next) =>{
    let url2 = req.params.url2;
    shortUrl.findOne({'shorterUrl': url2}, (err, data)=>{
        if (err) return res.send("ERROR READING DATABASE");
        
    })
})

app.listen(process.env.PORT || 4000, function(){
    console.log("URLShortner is running on port 4000...");
})