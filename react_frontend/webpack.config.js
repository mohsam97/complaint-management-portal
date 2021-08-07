module.exports = {
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude: /node_moduled/,
                use:{
                    loader: "babel-loader"
                }
            }
        ]
    }
}
