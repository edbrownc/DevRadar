const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

// Get Devs
routes.get('/devs', DevController.index);

// Create new Dev
routes.post('/devs', DevController.store);

// Update Dev
routes.put('/devs/:id', DevController.update);

// Delete Dev
routes.delete('/devs/:id', DevController.delete);

// Search Devs
routes.get('/search', SearchController.index);

module.exports = routes;
