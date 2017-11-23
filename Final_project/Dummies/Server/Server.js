//Temp server for response at GET

const express = require('express');
const app = express();

app.listen(65008, () => {
    console.log("dummy server2 enable");
});

app.post('/patient/exercise', (req, res) => {
    console.log('Data submitted : '+req.headers.idd_id + '  /  '+ req.headers.step_data);
});


app.post('/patient/information', (req, res) => {
    console.log('Data submitted : '+req.headers.idd_id+ '  /  '+req.headers.program_id);
});
