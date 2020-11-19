const express = require('express');
const ejs = require('ejs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const options = {
    extensions: ['html', 'htm']
}

const publicDirectoryPath = path.join(__dirname, 'public');

app.use(express.static(publicDirectoryPath, options));

app.set('view engine','ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => {
    console.log(`Server Running at http://localhost:${port}`);
});
