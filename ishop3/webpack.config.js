const path = require('path');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractCSS = new ExtractTextPlugin({
    filename: "bundle.css"
});

module.exports = { 
    entry:"./main.js",     
    output:{ 
        path: __dirname,        // путь к каталогу выходных файлов
        filename: "bundle.js"   // название создаваемого файла 
    }, 
    module:{ 
        rules:[
            {
                test: /\.css$/,
                use: extractCSS.extract({use: ["css-loader"]})
            },
            { 
                test: /\.js$/,                  // какие файлы обрабатывать
                exclude: /node_modules/,        // какие файлы пропускать
                use: { loader: "babel-loader" }
            }
        ] 
    },
    plugins:[extractCSS]
}