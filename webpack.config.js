const node_env = process.env.NODE_ENV ? process.env.NODE_ENV : 'production';
const devMode = node_env !== 'production';
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    entry: './src/index.js', // входная точка - исходный файл
    output: {
        path: path.join(__dirname, '/dist'), // путь к каталогу выходных файлов
        filename: "bundle.js",  // название создаваемого файла
        publicPath: devMode ? "/" : "./"
    },
    devtool: devMode ? 'source-maps' : 'eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 3000,
        watchContentBase: true,
        progress: true,
        open: false,
        host: '192.168.1.2',
        historyApiFallback: true
    },
    optimization: {
        minimize: devMode ? false : true,
        minimizer: [
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
                terserOptions: {
                    output: {
                        comments: false,
                    },
                },
                parallel: true
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.js$/,  // определяем тип файлов
                exclude: /node_modules/,  // исключаем из обработки папку node_modules
                use: {
                    loader: 'babel-loader',  // определяем загрузчик
                    options: {
                        presets: [["@babel/preset-env",
                            {
                                "targets": {
                                    "node": "10"
                                }
                            }
                        ],[ "@babel/preset-react"]],// используемые плагины
                        plugins: [
                            ["@babel/plugin-proposal-class-properties"],
                            ["import", { "libraryName": "antd", "style": "css" }]
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, "css-loader",
                    {
                        loader: 'postcss-loader'

                    }
                ]
            },
            {
                test: /\.(sass|scss)$/,
                use:  [
                    MiniCssExtractPlugin.loader,

                    {
                        loader: "css-loader"
                    },
                    {
                        loader: 'postcss-loader',

                    },
                    {
                        loader: "sass-loader"

                    }

                ]

            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: './fonts'
                            }
                        }
                    ]
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        name: 'images/[name].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "style.css",
            chunkFilename: "[name].css"}),
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        })

    ],

};