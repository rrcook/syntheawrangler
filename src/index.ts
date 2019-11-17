import fs from 'fs';
import path from 'path';
const program = require("commander");
// import * as config from 'config'
// This line works, above doesn't. Gotta love Typescript
// import config = require("config");

// Format for the output file
type outputFormat = {
  docs: any[];
}

// Run the Program

// Capture command line options
program
  .version('0.0.1')
  .description('A CLI for making couchdb files from synthea.')
  // .option('-d --directory <directory>', 'Directory where the files are', '/home/rrc/gitcode/synthea/output/fhir')
  .option('-d --directory <directory>', 'Directory where the files are', '.')
  .option('-o --outputfile <outputfile>', 'Output file', 'patients.json')
  .parse(process.argv);

  if (!process.argv.slice(2).length) {
    program.outputHelp();
    // process.exit();
  }

  const fullOutputPath = path.join(program.directory, program.outputfile);

  // delete file to get ready to read inputs
  fs.unlinkSync(fullOutputPath);

  console.log(`hello world from ${program.description()} at ${process.cwd()}`);
  console.log(`The directory we\'re using is at ${program.directory}`);

  // on MacOS, there can be a .DS_Store file. Might be others.
  const fileList = fs.readdirSync(program.directory).filter((d) => d.endsWith('.json'));

  // Object to build to write out.
  // "Global" properties of the object.
  // All FHIR objects will be put in here.
  const outputObject: outputFormat = {
    docs: []
  };

  fileList.forEach((fileName, index) => {
    console.log(fileName);
    const data = fs.readFileSync(path.join(program.directory, fileName), {encoding: 'utf8'});
    const jdata = JSON.parse(data);

    // Add couchdb related properties to the original object
    // Letting couchcb generate id
    // jdata._id = 'id' + (index + 1);

    outputObject.docs.push(jdata);
  });

  const outputText = JSON.stringify(outputObject, null, 2);

  fs.writeFileSync(fullOutputPath, outputText, {encoding: 'utf8'});
