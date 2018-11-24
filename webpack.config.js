require("@babel/polyfill");
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

//Set the client ID for your Lyrebird profile clientID -- wont work otherwise
const CLIENT_ID = "PLACE YOUR ID HERE!";
//Change these 3 if needed, default configuration
const REDIRECT_URL = "http://localhost:3000/";
const ACCESS_URL = "https://myvoice.lyrebird.ai";
const API_BASE = "https://avatar.lyrebird.ai";

const config = {
    entry: [
        'babel-polyfill',
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './src/index.js'
    ],
    module: {
        rules: [{
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    'react-hot-loader',
                    'babel-loader'
                ],
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'

                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'sass-style-loader',
                    use: 'sass-loader'

                })
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader']
            }
        ],
    },
    node: {
        fs: 'empty'
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.css', '.scss'],
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
                'CLIENT_ID': JSON.stringify(CLIENT_ID),
                'REDIRECT_URL': JSON.stringify(REDIRECT_URL),
                'API_BASE': JSON.stringify(API_BASE),
                'ACCESS_URL': JSON.stringify(ACCESS_URL)
            }
        })
    ],
    devServer: {
        contentBase: './dist',
        historyApiFallback: true
    }

};
if (process.env.NODE_ENV === 'production') {
    config.devtool = "cheap-module-source-map";
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
        new ExtractTextPlugin({
            filename: 'bundle.css',
            disable: false,
            allChunks: true
        }),
        new webpack.optimize.AggressiveMergingPlugin({
            minSizeReduce: 1,
            moveToParents: true

        })
    )

} else {
    config.devtool = "cheap-module-eval-source-map";
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
        new ExtractTextPlugin({ disable: true })
    )
}

module.exports = config;