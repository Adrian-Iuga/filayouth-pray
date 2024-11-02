const axios = require('axios');
const fs = require('fs');
const path = require('path');

const getAll = async () => {
    var data = {};

    // await axios.get('https://jsonplaceholder.typicode.com/todos/1')
    //     .then((response) => {
    //         data = response.data;
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });
    
    data.signupForm = "https://docs.google.com/forms/d/e/1FAIpQLSeH2Ux1YiuAFFdMWATV1r2P00c0K4simgl-5p74Y33TjDPhfg/viewform";
    data.teams = require('../data/teams.json');
    data.score = require('../data/score.json');

    return data;
}

const addCause = async (req, res, next) => {
    const filePath = path.join(__dirname, '../data/cause.txt');
    const causeLine = req.body.causeCategory + ' | ' + req.body.cause + '\n';    
  
    // Append the new line to "example.txt"
    fs.appendFile(filePath, causeLine, (err) => {
      if (err) {
        console.error('Error writing to file:', err);
        res.status(500).send('Failed to write to file');
      } else {
        res.send('Cauza a fost adăugată cu success în listă!');
      }
    });
};

const getCauses = async (req, res, next) => {    
    const filePath = path.join(__dirname, '../data/cause.txt');


    await fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Failed to read causes');
        }

        // Split the file content into an array of causes
        const causes = data.split('\n').filter(line => line.trim() !== '').sort();; // Filter to remove empty lines
        
        res.json(causes); // Send the causes as a JSON response
    });
};

module.exports = {
    getAll,
    addCause,
    getCauses
};