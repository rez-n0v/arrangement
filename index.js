const express = require('express');
const ejs = require('ejs');
const path = require('path');
const makeArrangements = require('./src/makeArrangement');

const app = express();
const port = process.env.PORT || 3000;

const options = {
    extensions: ['html', 'htm']
}

const publicDirectoryPath = path.join(__dirname, 'public');

app.use(express.static(publicDirectoryPath, options));
app.use(express.json());

app.set('view engine','ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

let results;
app.get('/arrangement', (req, res) => {
    res.render('arrangement', {
        data: results,
    });
});

app.post('/arrangement', (req, res) => {
    // console.log(typeof req.body);
    makeArrangements(req.body, (error, data) => {
        if(error) {
            return res.send({error});
        }

        results = data;
    });
});

app.listen(port, () => {
    console.log(`Server Running at http://localhost:${port}`);
});
