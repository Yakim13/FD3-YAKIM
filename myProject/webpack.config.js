const path = require('path');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractCSS = new ExtractTextPlugin({filename: "bundle.css"});

module.exports = { 
    entry: "./main.js",
    output:{
        path: __dirname,
        filename: "bundle.js" 
    }, 
    module:{ 
        rules:[
            { 
                test: /\.jsx?$/,
                exclude: /node_modules/,            
                use: {loader: "babel-loader"}
            },
            {
                test: /\.css$/,
                use: extractCSS.extract({use:{loader: "css-loader"}})
            },
            {
                test: /\.(svg|ttf|eot|woff|woff2)$/,
                use: {loader: "file-loader?name=bundle_[name].[ext]&publicPath=&outputPath=./fonts/"}
            },
            {
                test: /\.(png|jpg|svg)$/,
                use: {loader: "file-loader?name=[name].[ext]&publicPath=&outputPath=./img/"}
            }              
        ] 
    },
    plugins: [extractCSS]
}