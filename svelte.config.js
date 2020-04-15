const sveltePreprocess = require("svelte-preprocess");
module.exports = {
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? '/quarantine-platform/'
  //   : '/',
  preprocess: sveltePreprocess({
    scss: {
      includePaths: ["src"]
    },
    postcss: {
      plugins: [require("autoprefixer")]
    }
  })
};
