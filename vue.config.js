module.exports = {
    //outputDir: './dist',
    // publicPath: './admin',
    // publicPath: process.env.NODE_ENV === 'production'
    //     ? './dist/admin/'
    //     : '/',
    configureWebpack: {
        optimization: {
            splitChunks: false,
            namedChunks: true
        },

    },

    chainWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {
            config.plugin('html').tap((opts) => {
                opts[0].filename = './admin.html';console.log (config.plugin('html'));
                return opts;
            });
        }
        config.plugins.delete('prefetch')
    },

    css: {
        extract: false,
    },

    // productionSourceMap: process.env.NODE_ENV !== 'production'
    // NODE_ENV=development
    productionSourceMap: false,

    runtimeCompiler: true
};
