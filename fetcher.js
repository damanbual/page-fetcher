
const fs = require('fs');
const needle = require('needle');

// Get command line arguments
const [url, filePath] = process.argv.slice(2);


if (!url || !filePath) {
  console.error('Usage: node fetcher.js <URL> <local file path>');
  process.exit(1);
}
// Fetch the URL content
needle.get(url, (error, response, body) => {
  if (error) {
    console.error(`Failed to download resource: ${error.message}`);
    process.exit(1);
  }
  
  // Write the content to the local file
  fs.writeFile(filePath, body, 'utf8', (error) => {
    if (error) {
      console.error(`Failed to save file: ${error.message}`);
      process.exit(1);
    }
    
    // Print success message with file size
    const fileSize = body.length; // 1 character = 1 byte for UTF-8
    console.log(`Downloaded and saved ${fileSize} bytes to ${filePath}`);
  });
});