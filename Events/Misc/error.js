const constantFile = require("../../Storage/constants.js");

module.exports = {
  name: "error",
  once: false,
  async execute(error) {
    console.error(error);
  },
};
