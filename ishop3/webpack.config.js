const path = require('path');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractCSS = new ExtractTextPlugin({
    filename: "bundle.css"
});

module.exports = { 
    entry: "./main.js", 
    output:{ 
        path: __dirname, 
        filename: "bundle.js"   
    }, 
    module:{ 
        rules:[
            { 
                test: /\.js$/,                      // какие файлы обрабатывать
                exclude: /node_modules/,            // какие файлы пропускать
                use: { loader: "babel-loader" }
            },
            {
                test: /\.css$/,
                use: extractCSS.extract({use: ["css-loader"]})
            }            
        ] 
    },
    plugins: [extractCSS]
}