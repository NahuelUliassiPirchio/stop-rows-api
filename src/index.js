const express = require('express');
const PORT = process.env.PORT || 3001;

const app = express();

app.get('/',(req,res)=>{
    res.send('<h2>It\'s Working!</h2>');
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});