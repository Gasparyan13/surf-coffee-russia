const path = require('path')
const webpack = require('webpack')
const CopyWebPack = require('copy-webpack-plugin')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

require('dotenv').config({
  path: `./env/.${process.env.ENV}.env`,
  debug: process.env.DEBUG === 'true',
})

const ProjectDIR = path.resolve(__dirname) + '/'
const SourceDIR = ProjectDIR + 'src/'
const BuildDIR = ProjectDIR + './build/'
const Mode = 'development'

const config = {
  context: __dirname,
  mode: Mode,
  entry: {
    bundle: SourceDIR + 'index.tsx',
  },
  externals: {},
  output: {
    path: path.resolve(BuildDIR),
    filename: '[name].[hash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript',
              [
                '@babel/preset-react',
                { runtime: 'automatic', importSource: '@emotion/react' },
              ],
            ],
            plugins: [
              '@emotion/babel-plugin',
              '@babel/proposal-class-properties',
              '@babel/proposal-object-rest-spread',
              '@babel/plugin-transform-runtime',
              [
                '@babel/plugin-transform-typescript',
                {
                  allowNamespaces: true,
                },
              ],
              [
                '@babel/plugin-proposal-optional-chaining',
                {
                  loose: true,
                },
              ],
            ],
          },
        },
        include: [path.resolve(SourceDIR)],
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: 'style-loader',
            options: { injectType: 'singletonStyleTag' },
          },
          'css-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use: 'url-loader',
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: '/',
              esModule: false,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: ['node_modules', SourceDIR],
    extensions: ['.ts', '.tsx', '.mjs', '.js', '.jsx', '.json'],
    plugins: [new TsconfigPathsPlugin()],
  },
  target: 'web',
  performance: {
    hints: 'warning',
    maxAssetSize: 500000,
    maxEntrypointSize: 500000,
  },
  stats: 'errors-warnings',
}

const plugins = [
  new webpack.DefinePlugin({
    $ENV_MODE$: JSON.stringify(Mode),
    $BACK_DOMAIN$: JSON.stringify(
      process.env.BACKEND_URL || process.env.BACK_DOMAIN,
    ),
  }),
  new HtmlWebpackPlugin({
    template: ProjectDIR + 'public/index.html',
  }),
  new CopyWebPack([
    {
      from: ProjectDIR + 'public/assets',
      to: BuildDIR + '/assets',
    },
    {
      from: ProjectDIR + 'public',
    },
  ]),
]

/**
 * Настройки для дебага
 */
if (process.env.DEBUG === 'true' || process.env.ENV === 'local') {
  config.devtool = 'source-map'
  ;(config.performance = {
    hints: false,
  }),
    (config.devServer = {
      port: 3000,
      contentBase: path.resolve(BuildDIR, process.env.ENV),
      hot: true,
      inline: true,
      historyApiFallback: true,
      proxy: {
        '/api/*': {
          // Пока нет хостинга бэка
          target: 'https://even.dev/api/',
          changeOrigin: true,
          pathRewrite: {
            '/api': '/',
          },
        },
      },
    })
  plugins.push(new webpack.NamedModulesPlugin())
  plugins.push(new webpack.HotModuleReplacementPlugin())
} else {
  config.devtool = false
}
/**
 * Настройки для аналитики
 */
if (process.env.ANALYZE === 'true') {
  plugins.push(new BundleAnalyzerPlugin())
}

config.plugins = plugins

module.exports = config
