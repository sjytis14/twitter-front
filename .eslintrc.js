module.exports = {
  root: true,
  parser: "@babel/eslint-parser",
  plugins: ["import", "react", "jsx-a11y", "react-hooks"],
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  rules: {
    "react/prop-types": "warn",
    "no-console": "warn",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/no-array-index-key": "warn",
    "jsx-a11y/anchor-is-valid": 0,
    "no-unused-vars": "warn",
  },
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
};
