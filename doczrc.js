import path from 'path'
import autoprefixer from 'autoprefixer'
const APP_DIR = path.resolve('./src');
const basePath = process.env.PUBLIC_URL ? '/dante-docs/' : '/'

export default {
  theme: 'src/docs/theme',
  hashRouter: true,
  base: basePath,
  //theme: 'src/docs/docz-theme-default/src/index.tsx',
  
  modifyBabelRc: (babelrc) => {
    console.log(JSON.stringify(babelrc))
    babelrc.babelrc = false
    babelrc.presets = [["react-app", {"flow":true}]]
    babelrc.plugins = [
      'react-docgen',
      ["prismjs", {
        "languages": ["javascript", "css", "markup", "jsx"],
        "plugins": ["line-numbers", "normalize-whitespace"],
        "theme": "twilight",
        "css": true
      }]
    ]
    return babelrc
  },

  modifyBundlerConfig: config => {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        require.resolve('style-loader'),
        {
          loader: require.resolve('css-loader'),
          options: {
            importLoaders: 1,
          },
        },

        {
          loader: require.resolve('sass-loader'),
          options: {
            importLoaders: 1,
          },
        }
      ]
    });

    config.module.rules.push({
      test: /\.css$/,
      use: [
        require.resolve('style-loader'),
        {
          loader: require.resolve('css-loader'),
          options: {
            importLoaders: 1,
          },
        },
        {
          loader: require.resolve('postcss-loader'),
          options: {
            // Necessary for external CSS imports to work
            // https://github.com/facebookincubator/create-react-app/issues/2677
            ident: 'postcss',
            plugins: () => [
              require('postcss-flexbugs-fixes'),
              autoprefixer({
                browsers: [
                  '>1%',
                  'last 4 versions',
                  'Firefox ESR',
                  'not ie < 9', // React doesn't support IE8 anyway
                ],
                flexbox: 'no-2009',
              }),
            ],
          },
        },
      ],
    });

/*
    config.module.rules.push({
      test: /\.(js|jsx)$/,
      include: APP_DIR,
      loader: 'babel-loader',

      options: {
        cacheDirectory: true,
        babelrc: false,
        plugins: [
          ["prismjs", {
              languages: ["javascript", "css", "markup", "jsx"],
              plugins: ["line-numbers", "normalize-whitespace"],
              theme: "twilight",
              css: true
          }]
        ]
      }
    });
*/

    return config;
  }
};



          