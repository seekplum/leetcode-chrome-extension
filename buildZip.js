/** @format */
const AdmZip = require('adm-zip'); // eslint-disable-line @typescript-eslint/no-var-requires,import/no-extraneous-dependencies
const config = require('./package.json'); // eslint-disable-line @typescript-eslint/no-var-requires

const file = new AdmZip();

file.addLocalFolder('./extension');
file.writeZip(`./extension/leetcode-chrome-extension-v${config.version}.zip`);
