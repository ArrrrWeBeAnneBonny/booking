module.exports = {
  entry: './client/src/Booking.jsx',
  watch: true,
  mode: "development",
  output: {
    filename: 'booking.js',
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
    ]
  },
};

//read about env variables webpack
//NODE_ENV special cuz express and happy say its important
//use lighthouse to measure my performance
  //differences in production vs. non-production????

  // RUN_PROXY_OR_NOT