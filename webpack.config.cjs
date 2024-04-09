const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { merge } = require('webpack-merge');
const path = require('path');

// Common configuration
const commonConfig = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'index', // Optional: Specify a title for the generated file
      template: './src/index_template.html', // Optional: Specify a template file
      // If `template` is not specified, the plugin will generate an HTML5 file for you 
      // that includes all your webpack bundles in the body using script tags
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/assets', to: 'assets' }, // Copies all assets
      ],
    }),
  ],
};

// Development-specific configuration
const developmentConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    open: true,
    hot: true,
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};

// Production-specific configuration
const productionConfig = {
  mode: 'production',
  // Add production-specific plugins or settings here
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // Clean the output directory before emit.
  },
};

// Export a function that dynamically merges configurations
module.exports = async (env, args) => {
  switch (args.mode) {
    case 'development':
      return merge(developmentConfig, commonConfig);
    case 'production':
      return merge(productionConfig, commonConfig);
    default:
      throw new Error('No matching configuration was found!');
  }
};