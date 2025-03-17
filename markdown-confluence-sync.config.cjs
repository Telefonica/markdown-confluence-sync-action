module.exports = {
  preprocessor: (content) => {
    // eslint-disable-next-line no-console
    console.log(content);
    return content;
  },
  logLevel: "debug",
};
