const path = require('path');

/**
 * @type {import('next-i18next').UserConfig}
 */
module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["ja", "en"],
    localePath: path.resolve('./public/locales')
  },
  ns: ["common"],
  defaultNS: "common",
  debug: false,
  keySeparator: false,
  nsSeparator: false,
};
