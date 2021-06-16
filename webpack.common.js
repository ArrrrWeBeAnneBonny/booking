const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/src/Booking.jsx',
  watch: true,
  plugins: [new HtmlWebpackPlugin({
    template: './client/templates/index.html'
  })],
  output: {
    filename: `booking.js`,
    //get a file format so i can version my bundle
    path: __dirname + '/client/dist'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.css'
    ]
  }
};
