const _ = require('lodash');

function getStatistics(blogData) {
  // Process the blog data to generate statistics
  // For example, you can use Lodash to perform various calculations

  const totalPosts = blogData.length;
  const totalViews = _.sumBy(blogData, 'views');
  const averageViewsPerPost = totalViews / totalPosts;

  // Find the blog with the longest title
  const longestTitleBlog = _.maxBy(blogData, 'title.length');

  // Count blogs with titles containing "privacy"
  const privacyBlogs = _.filter(blogData, post => post.title.toLowerCase().includes('privacy'));
  const numPrivacyBlogs = privacyBlogs.length;

  // Create an array of unique blog titles
  const uniqueTitles = _.uniqBy(blogData, 'title').map(post => post.title);

  return {
    totalPosts,
    totalViews,
    averageViewsPerPost,
    longestTitleBlog,
    numPrivacyBlogs,
    uniqueTitles
    // Add more statistics as needed
  };
}

module.exports = { getStatistics };
