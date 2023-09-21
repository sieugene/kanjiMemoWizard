/**
 * @type {import('next-i18next').UserConfig}
 */
module.exports = {
  i18n: {
    defaultLocale: "ja",
    locales: ["ja", "en"],
  },
  ns: ["common"],
  defaultNS: "common",
  debug: false,
  keySeparator: false,
  nsSeparator: false,
};
