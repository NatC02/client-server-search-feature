import express from 'express';
import cors from 'cors';

// Initialize express
const app = express();
app.use(cors()); // Enable CORS
app.use(express.json()); // for parsing application/json

// Make some animals 
import Chance from 'chance';
const chance = new Chance();

// "[...Array(100).keys()]" converts array of integers to a range of 0 to 100. With spread syntax we create a new array based on the index of the original array.
const animals = [...Array(100).keys()].map(id => {
    return {
        id,
        type: chance.animal(),
        age: chance.age(),
        name: chance.name(),
    }
});

// Endpoint to search for animals
app.get('', (req, res) => {

    // Filter results by query
    const q = req.query.q?.toLowerCase() || '';
    const results = animals.filter(animal => animal.type.toLowerCase().includes(q));

    res.send(results);
});

app.listen(2000, () => console.log('Listening on port http://localhost:2000'));