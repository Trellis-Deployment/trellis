const  {readdirSync, existsSync, readFileSync, promises: fsPromises } = require("fs");
function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');
  let contentsArr = contents.split(/\r?\n/);
  
  contentsArr = contentsArr.filter(line => {
     return (line.includes('[INFO]') || line.includes('[DEBUG]')) && 
      !line.includes('PROGRESS') && !line.includes('Checking') &&
      !line.includes("Fetching");
   });
  
   console.log(contentsArr.join("\n"));
  
  return contents
}

syncReadFile('./.build/sst-debug.log');