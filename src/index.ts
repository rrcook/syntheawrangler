import fs from 'fs';
import path from 'path';
const program = require("commander");
// import * as config from 'config'
// This line works, above doesn't. Gotta love Typescript
// import config = require("config");

// Run the Program

// Capture command line options
program
  .version('0.0.1')
  .description('A CLI for making couchdb files from synthea.')
  .option('-d --directory <directory>', 'Directory where the files are', '/home/rrc/gitcode/synthea/output/fhir')
  // .option('-d --directory <directory>', 'Directory where the files are', '.')
  .parse(process.argv);

  if (!process.argv.slice(2).length) {
    program.outputHelp();
    // process.exit();
  }

  console.log(`hello world from ${program.description()} at ${process.cwd()}`);
  console.log(`The directory we\'re using is at ${program.directory}`);

  const dir = fs.readdirSync(program.directory, {withFileTypes: true});

  for (const dirent of dir) {
    console.log(dirent.name);
    const data = fs.readFileSync(program.directory + '/' + dirent.name, {encoding: 'utf8'});
    const jdata = JSON.parse(data);
    console.log(jdata.entry[100].resource.id);

  }