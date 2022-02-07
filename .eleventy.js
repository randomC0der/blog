module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('CNAME');
  eleventyConfig.addPassthroughCopy("src/assets/static/");

  return {
    dir: { input: "src", output: "_site" },
  };
};
