'use strict'
const path=require('path');



module.exports={
    entry:{
        main:['./src/main.js']
    },
    output:{
        path:path.resolve(__dirname,'./build'),
        filename:'[name].js'
    },
    module:{
        rules:[
            { test:/\.js$/,use:"babel-loader"},
            { test:/\.css$/,use:"style-loader",use: "css-loader"},
            { test:/\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,use:"file-loader"},
            { test:/.(sass|scss)$/,use:"style-loader",use: "css-loader",use:"sass-loader"},
           // { test: /\.css$/, use: 'css-loader'},
            { test:/\.(png|jpg|gif)$/,use:"file-loader"},
            {test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'file-loader'},
            {include:path.resolve(__dirname,'./src')},
        ]
    },
    plugins:[],
    devServer:{
        
        static:'./public',
        host:'localhost',
        port:3000
       
    }

}