const webpack = require('webpack');
module.exports = {
 entry: ["./app.js"],
 output: {
   filename: "../bundle.js",
 },
 module: {
   loaders: [
     {
       test: [/\.js$/, /\.es6$/],
       exclude: /node_modules/,
       loader: 'babel-loader',
       query: {
         presets: ['react','es2015']
       }
    },
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }
   ]
 },
 plugins:[
    new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery',
        jquery: 'jquery'
    })
],
 resolve: {
   extensions: ['.js', '.es6','.css']
 }
}
