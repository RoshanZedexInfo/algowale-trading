// create-entity.js

const fs = require('fs');
const path = require('path');

// Get the model name from command-line arguments
const modelName = process.argv[2];
if (!modelName) {
  console.error(
    'Please provide the name of the model. Example: npm run entity NameOfTheModel',
  );
  process.exit(1);
}

// Define the path to the new folder and file
const srcPath = path.join(__dirname, 'src');
const entitiesPath = path.join(srcPath, modelName, 'entities');
const entityFilePath = path.join(entitiesPath, `${modelName}.entity.ts`);

// Create folder if it doesn't exist
if (!fs.existsSync(entitiesPath)) {
  fs.mkdirSync(entitiesPath, { recursive: true });
}

// Create the entity file if it doesn't exist
if (!fs.existsSync(entityFilePath)) {
  const fileContent = `export class ${modelName}Entity {\n  // Define your entity properties here\n}\n`;

  fs.writeFileSync(entityFilePath, fileContent, { flag: 'w' });
  console.log(`Entity file created at: ${entityFilePath}`);
} else {
  console.log('Entity file already exists.');
}

//how to run
// npm run entity User
