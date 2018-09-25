const pkg = require('./package')
const PurgecssPlugin = require('purgecss-webpack-plugin');
const glob = require('glob-all');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  router: {
    base: '/nuxt-reveal/docs/'
  },
  generate: {
    dir: 'docs'
  },

  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/img/favicon.png' },
      { rel: 'apple-touch-icon', href: '/img/apple-touch-icon.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,700,700i|Raleway:300,400,500,700,800|Montserrat:300,400,700' },
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#FFFFFF' },

  /*
  ** Global CSS
  */
  css: [
    { src: 'node_modules/bootstrap/dist/css/bootstrap.css' },
    { src: '~/assets/lib/font-awesome/css/font-awesome.min.css' },
    { src: '~/assets/lib/animate/animate.min.css' },
    { src: '~/assets/lib/ionicons/css/ionicons.min.css' },
    { src: '~/assets/lib/owlcarousel/assets/owl.carousel.min.css' },
    { src: '~/assets/lib/magnific-popup/magnific-popup.css' },
    { src: '~/assets/lib/ionicons/css/ionicons.min.css' },
    { src: '~/assets/css/style.css' },
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/bootstrap.js',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
  ],

  /*
  ** Build configuration
  */
  build: {
    vendor: [
      'jquery',
      'bootstrap/dist/js/bootstrap.bundle',
      '~/assets/lib/easing/easing.min.js',
      '~/assets/lib/superfish/hoverIntent.js',
      '~/assets/lib/superfish/superfish.min.js',
      '~/assets/lib/owlcarousel/owl.carousel.min.js',
      '~/assets/lib/magnific-popup/magnific-popup.min.js',
      '~/assets/lib/sticky/sticky.js',
      '~/assets/js/main.js',
    ],

    plugins: [
      // set shortcuts as global for bootstrap
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      })
    ],

    /*
    ** You can extend webpack config here
    */
    extend(config, { isDev }) {
      if (!isDev) {
        // Remove unused CSS using purgecss. See https://github.com/FullHuman/purgecss
        // for more information about purgecss.
        config.plugins.push(
          new PurgecssPlugin({
            paths: glob.sync([
              path.join(__dirname, './pages/**/*.vue'),
              path.join(__dirname, './layouts/**/*.vue'),
              path.join(__dirname, './components/**/*.vue')
            ]),
            whitelist: ['html', 'body']
          })
        )
      }
    }
  }
}
