module.exports = {
  linters: {
    "**/*.+(js|md|json|jsx)": ["eslint --fix", "prettier --write", "git add"]
  }
};
