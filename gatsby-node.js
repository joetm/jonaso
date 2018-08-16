const rimraf = require('rimraf');

const PUBLIC_FOLDER = `${__dirname}/public`;

exports.onPreBuild = () => {
  // empty /public folder
  rimraf.sync(PUBLIC_FOLDER + '/*');
};
