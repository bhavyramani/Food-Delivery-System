const express = require('express');
const app = express();
const port = 5000;
const hostname = '127.0.0.1';
const mongoDB = require('./db');
mongoDB();

app.use((req, res, next)=>{
    console.log("Debug: ", req);
    res.setHeader("Access-Control-Allow-Origin", "https://go-food-bydq.onrender.com");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.get('/', (req, res)=>{
    res.send('Hello World!!');
});

app.use(express.json());
app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/OrderData'));
app.use('/api', require('./Routes/ProfileUser'));

app.listen(port, ()=>{
    console.log(`Example app listening on port http://${hostname}:${port}`);
});