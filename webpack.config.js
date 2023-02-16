const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './jspsych/main/jatos/practice-with-demo.js',
    output: {
        path: __dirname + '/dist',
        filename: 'index_bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
}
