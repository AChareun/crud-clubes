const readFile = (
  fs,
  filePath,
  callback,
  returnJson = false,
  encoding = 'utf8',
) => {
  fs.readFile(filePath, encoding, (err, data) => {
    if (err) {
      throw err;
    }

    callback(returnJson ? JSON.parse(data) : data);
  });
};

const writeFile = (
  fs,
  filePath,
  fileData,
  callback,
  encoding = 'utf8',
) => {
  fs.writeFile(filePath, fileData, encoding, (err) => {
    if (err) {
      throw err;
    }

    callback();
  });
};

module.exports = { readFile, writeFile };
