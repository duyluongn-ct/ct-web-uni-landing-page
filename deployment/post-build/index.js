/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-commonjs
const fs = require('fs');
// eslint-disable-next-line import/no-commonjs
const path = require('path');
const { ncp } = require('ncp');

const { version } = require('../../buildid.json');

const directoryMkdir = path.resolve(
  __dirname,
  `../../${process.env.NODE_ENV === 'production' ? version : '.next'}/`
);
const dirs = [`${directoryMkdir}/_next`, `${directoryMkdir}/_next/static`];

const directoryPath = path.resolve(
  __dirname,
  `../../${process.env.NODE_ENV === 'production' ? version : '.next'}/static`
);

const destinationPath = path.resolve(
  __dirname,
  `../../${process.env.NODE_ENV === 'production' ? version : '.next'}/_next/static`
);

// create dir
dirs.forEach((item) => {
  fs.mkdirSync(item);
});

ncp(directoryPath, destinationPath, function (err) {
  if (err) {
    return console.error(err);
  }
  console.log('done!');
});
