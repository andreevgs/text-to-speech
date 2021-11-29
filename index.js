const express = require('express');
const path = require('path');
const cors = require("cors");

const app = express();

const corsOptions = {
    origin: '*'
};

const port = process.env.PORT || 3002;

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/html/main.html'));
});

app.listen(port, () => {
    console.log(`Express web app available at localhost: ${port}`);
});