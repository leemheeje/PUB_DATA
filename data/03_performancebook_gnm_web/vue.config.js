module.exports = {
	//outputDir: '../',
	devServer:{
		proxy: {
            '/crbook': {// /crbook으로 예정중
                target: 'http://localhost:86/' // 개발서버
            },
            '/auth': {
                target: 'http://localhost:86/' // 개발서버
            },
        }
	},
	publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/'
}