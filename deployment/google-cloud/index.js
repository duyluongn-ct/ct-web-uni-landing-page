/* eslint-disable no-console */
/* eslint-disable import/no-commonjs */
const fs = require('fs');
const path = require('path');

const { version } = require('../../package.json');

const bucketName = process.env.BUCKET_NAME || 'static-chotot-com';
const env = (process.env.ENV || 'staging').toUpperCase();

const directoryPath = path.resolve(__dirname, `../../${process.env.BUILD_ID || version}`);

async function googleCloudUploader() {
  // eslint-disable-next-line global-require
  const { Storage } = require('@google-cloud/storage');
  const fileList = [];

  async function uploadDirectory() {
    // Creates a client
    const storage = new Storage();

    // get the list of files from the specified directory
    let dirCtr = 1;
    let itemCtr = 0;
    const pathDirName = path.dirname(directoryPath);

    getFiles(directoryPath);

    function getFiles(directory) {
      fs.readdir(directory, (err, items) => {
        dirCtr--;
        itemCtr += items.length;
        items.forEach((item) => {
          const fullPath = path.join(directory, item);
          fs.stat(fullPath, (_err, stat) => {
            itemCtr--;
            if (stat.isFile()) {
              fileList.push(fullPath);
            } else if (stat.isDirectory()) {
              dirCtr++;
              getFiles(fullPath);
            }
            if (dirCtr === 0 && itemCtr === 0) {
              onComplete();
            }
          });
        });
      });
    }

    async function onComplete() {
      const directory = `LANDING_PAGE_${env}`;
      const resp = await Promise.all(
        fileList.map((filePath) => {
          let destination = path.relative(pathDirName, filePath);
          // If running on Windows
          if (process.platform === 'win32') {
            destination = destination.replace(/\\/g, '/');
          }
          return storage
            .bucket(bucketName)
            .upload(filePath, { destination: `storage/${directory}/${destination}`, public: true })
            .then(
              (uploadResp) => ({
                fileName: `storage/${directory}/${destination}`,
                status: uploadResp[0],
              }),
              (err) => {
                throw new Error(err);
              }
            );
        })
      );

      const successfulUploads =
        fileList.length - resp.filter((r) => r.status instanceof Error).length;
      console.log('resp', resp);
      console.log(`${successfulUploads} files uploaded to ${bucketName} successfully.`);
    }
  }
  try {
    uploadDirectory();
  } catch (error) {
    console.log(error);
  }
}

googleCloudUploader();
