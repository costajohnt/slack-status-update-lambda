import HoneybadgerSlackStatus from './HoneybadgerSlackStatus';

'use strict';
require('dotenv').config();
const jf = require('jsonfile');

function entry(event, context, callback) {
  const hb = new HoneybadgerSlackStatus();
  hb.message()
}

function test() {
  const hb = new HoneybadgerSlackStatus();
  hb.message()
}

module.exports = {
  entry,
  test,
};
