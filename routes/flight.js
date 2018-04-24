const express = require('express');
const fetch = require('node-fetch');

// get polyfil
// const qs = require('../bin/quicksort');

const router = express.Router();

// providers
const url = 'http://127.0.0.1:9000/scrapers/';
const arr = ['Travelocity', 'Expedia', 'Orbitz', 'Priceline', 'United'];
const urls = arr.map(provider => url + provider);

const handleFlights = (json) => {
  // total flight objects in json
  const totalFlights = json.reduce((memo, curr) => memo + curr.results.length, 0); // 4298
  // combine all the objects in a single array to sort on agony
  const combinedFlights = json.reduce((memo, cur) => memo.concat(cur.results), []);

  // ///////////////////////////////////////////////////////////
  // Using native sort because:
  // http://blog.bogojoker.com/2008/06/javascript-sort-an-array-of-objects/
  // tl.dr 59.253 times better (apparently) than quicksort polyfill
  // ///////////////////////////////////////////////////////////
  combinedFlights
              .sort((a, b) => a.agony < b.agony ? -1 : a.agony > b.agony ? 1 : 0);

  // format for test script
  return { results: combinedFlights };
};

const getFlights = async (req, res) => {
  try {
    Promise
      .all(urls.map(url => fetch(url).then(resp => resp.json())))
      .then((data) => {
        // sort the data before sending it
        const sortedFlights = handleFlights(data);
        res.send(sortedFlights);
        // res.render('flight', { title: 'Searched Flights', sortedFlights });
      })
      .catch(err => console.error('! ', err));
  } catch (err) {
    console.error('! ', err);
  }
};

/* GET flights */
router.get('/', (req, res) => {
  getFlights(req, res);
});

module.exports = router;
