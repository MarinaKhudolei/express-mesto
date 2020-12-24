const express = require('express');
const app = express();
const path = require('path');


const { PORT = 3000 } = process.env;

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});