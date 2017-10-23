const express = require('express');

const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');

const jade = require('jade');
const fs = require('fs');

const app = express();
app.use(cookieparser());
app.use(bodyparser.urlencoded({
    extended:false
}));

app.get('/', (req, res)=>{
    res.send()
})

app.post('/',(req, res)=>{

})

app.listen(65001, ()=>{
    console.log('server is on 127.0.0.1:65001');
})