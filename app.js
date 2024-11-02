// Import essential libraries 
const express = require('express');
const app = express();
const router = express.Router();
const favicon = require('serve-favicon')
const homeController = require('./src/controllers/homeController');

//server.js
const cnad = require("@bitc/cnad");
cnad.config("/home/zhofcoxf/nodevenv/pray.filayouthsv.ro/10");

cnad.start();

app.use(express.json()); // This line is required to parse JSON request bodies
app.use(express.static(__dirname + '/src'));
app.use(favicon(__dirname + '/src/img/favicon.ico'));

app.set('view engine', 'ejs');

app.get('/', homeController.home);


// Setup essential routes 
router.get('/', homeController.home);
router.post('/add-text', homeController.addCause);
router.get('/causes', homeController.getCauses);


//add the router 
app.use('/', router);
app.listen(process.env.PORT || 3000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
