module.exports = {
    plugins: [
        require('autoprefixer')({
            browsers:["last 1 version",
                        "> 1%",
                      "IE 10"]
        }),
        require('css-mqpacker'),
        require('cssnano')({
            preset: [
                'default', {
                    discardComments: {
                        removeAll: true,
                    }
                }
            ]
        })
    ]
};