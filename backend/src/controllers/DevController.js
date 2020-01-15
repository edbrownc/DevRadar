const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

// index, show, store, update, destroy

module.exports = {
  async index(request, response) {
    const devs = await Dev.find();

    return response.json(devs);
  },
  async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const apiResponse = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      // name = login - If Name doesn't exist use Login
      const { name = login, avatar_url, bio, login } = apiResponse.data;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });
    }

    return response.json(dev);
  },
  async update(request, response) {
    const { techs, latitude, longitude, avatar_url, name, bio } = request.body;

    let dev = await Dev.findOne({ github_username: request.params.id });

    if (!dev) return response.status(404).json({ msg: 'Dev not found' });

    if (dev) {
      const devUpdate = {};

      if (name) devUpdate.name = name;
      if (techs) devUpdate.techs = parseStringAsArray(techs);
      if (avatar_url) devUpdate.avatar_url = avatar_url;
      if (bio) devUpdate.bio = bio;
      if (latitude && longitude) {
        devUpdate.location = {
          type: 'Point',
          coordinates: [longitude, latitude]
        };
      }

      dev = await Dev.findOneAndUpdate(
        { github_username: request.params.id },
        { $set: devUpdate },
        { new: true }
      );
    }

    return response.json(dev);
  },
  async delete(request, response) {
    let dev = await Dev.findOne({
      github_username: request.params.id
    });

    if (!dev) return response.status(404).json({ msg: 'Dev not found' });

    await Dev.findOneAndRemove({
      github_username: request.params.id
    }).then(() => response.json({ msg: 'Dev deleted' }));
  }
};
