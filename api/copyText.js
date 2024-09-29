const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

app.get('/copy', (req, res) => {
    const text = req.query.text ? decodeURIComponent(req.query.text) : '';
    res.json({ copiedText: text });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
