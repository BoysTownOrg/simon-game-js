const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        coloredCircles: './jspsych/main/jatos/colored-circles.js',
        blackSquares: './jspsych/main/jatos/black-squares.js',
        practice: './jspsych/main/jatos/practice.js',
        practiceWithDemo: './jspsych/main/jatos/practice-with-demo.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'colored-circles.html',
            template: 'jatos-template.html',
            chunks: ['coloredCircles']
        }),
        new HtmlWebpackPlugin({
            filename: 'black-squares.html',
            template: 'jatos-template.html',
            chunks: ['blackSquares']
        }),
        new HtmlWebpackPlugin({
            filename: 'practice.html',
            template: 'jatos-template.html',
            chunks: ['practice']
        }),
        new HtmlWebpackPlugin({
            filename: 'practice-with-demo.html',
            template: 'jatos-template.html',
            chunks: ['practiceWithDemo']
        }),
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
