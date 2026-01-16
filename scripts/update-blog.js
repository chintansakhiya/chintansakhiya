// Example script - adapt to your blog's feed
const fs = require('fs');
const axios = require('axios');

const updateFeed = async () => {
  try {
    const readme = fs.readFileSync('./README.md', 'utf8');
    // Replace with your blog's JSON feed URL
    const feed = await axios.get('https://yourblog.com/feed.json');
    const posts = feed.data.items.slice(0, 5); // Get latest 5

    let newContent = '<!-- BLOG-POST-LIST:START -->\\n';
    posts.forEach(item => {
      newContent += `- [${item.title}](${item.url})\\n`;
    });
    newContent += '<!-- BLOG-POST-LIST:END -->';

    // Find and replace the blog post section in README
    const updatedReadme = readme.replace(
      /<!-- BLOG-POST-LIST:START -->[\\s\\S]*<!-- BLOG-POST-LIST:END -->/,
      newContent
    );
    fs.writeFileSync('./README.md', updatedReadme);
  } catch (error) { console.error(error); }
};
updateFeed();