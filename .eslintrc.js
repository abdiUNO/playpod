module.exports = {
  parser: "babel-eslint",
  env: {
    es6: true,
    "react-native/react-native": true
  },
  globals: {
    fetch: true,
    window: true,
    __DEV__: true,
    navigator: true,
    ReactElement: true,
    requestAnimationFrame: true,
    jest: true,
    Iterable: true,
    Action: true,
    FormData: true,
    require: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-native/all"
  ],
  plugins: [
    "react",
    "react-native",
    "flowtype",
    "jsx-a11y",
    "import",
    "prettier"
  ],
  rules: {
    "no-console": "off",
    "prettier/prettier": "error",
    "react/prefer-stateless-function": ["off"],
    "import/no-extraneous-dependencies": [
      "off",
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false
      }
    ],
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "no-undef": ["warn"],
    "linebreak-style": ["error", "unix"],
    "react/prop-types": ["error", { ignore: ["componentId"] }],
    "react/no-typos": "off",
    "prefer-promise-reject-errors": "off",
    "react-native/no-unused-styles": 2,
    "react-native/sort-styles": ["off"],
    quotes: ["error", "double"],
    semi: ["error", "never"]
  }
}
