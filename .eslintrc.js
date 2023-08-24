module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: ['next', 'next/core-web-vitals', 'plugin:react/recommended'],
  rules: {
    "react/prop-types": "off"
  },
};
