const express = require("express");
const routes = require("./routes");
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001; 

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(routes);

mongoose.connect(process.env.MONGODB_URI || '', {
    useNewURLParser: true, 
    useUnifiedTopology: true
});

monogoose.set('debug', true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));