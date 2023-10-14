const express = require('express');
const cors = require('cors')
const _ = require('lodash');
const app = express();
const port = 5000; 
app.use(express.json());
app.use(cors());
const axios = require('axios');
const { getStatistics } = require('./middleware'); // You'll create this middleware in step 3
let blogData = [];
// Define route handler
app.get('/api/blog-stats', async (req, res) => {
  try {
    const response = await axios.get('https://intent-kit-16.hasura.app/api/rest/blogs', {
      headers: {
        'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6'
      }
    });
    blogData = response.data.blogs; // Assuming the API returns an array of blog posts

    // Process blog data using middleware
    const stats = getStatistics(blogData);
    console.log(stats)
    // Send the statistics as the response
    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/blog-search', (req, res) => {
    const searchTerm = req.query.q; // Assuming the search term is provided as a query parameter
    
    // Implement your search logic here, using the searchTerm and the fetched blog data
  
    // For example, you can use Lodash to filter the blog data based on the search term
    const searchResults = _.filter(blogData, post => post.title.includes(searchTerm));
  
    res.json(searchResults);
  });
  

app.listen(port, () => {
  console.log(`Server is running on http://127.0.0.1:${port}`);
});
