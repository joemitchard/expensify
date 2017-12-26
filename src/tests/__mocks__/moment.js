const moment = require.requireActual('moment');

// Export a mock for Moment, making the default epoch rather than now
export default (timestamp = 0) => {
  return moment(timestamp);
};
