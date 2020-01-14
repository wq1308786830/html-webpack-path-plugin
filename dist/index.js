"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const lodash_1 = __importDefault(require("lodash"));
const html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
class HtmlWebpackPublicPathPlugin {
    constructor(options) {
        this.options = lodash_1.default.extend({
            publicPath: "" // publicPath you want to apply
        }, options);
    }
    apply(compiler) {
        if (compiler.hooks) {
            // webpack 4 support
            compiler.hooks.compilation.tap("HtmlWebpackPath", (compilation) => {
                // Static Plugin interface |compilation |HOOK NAME | register listener
                // support HtmlWebpackPlugin 3.x
                if (compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing) {
                    compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync("HtmlWebpackOss", (htmlData, callback) => {
                        this.changePublicPath(htmlData, callback);
                    });
                }
                else {
                    // support HtmlWebpackPlugin 4.x
                    // @ts-ignore
                    html_webpack_plugin_1.default.getHooks(compilation).beforeAssetTagGeneration.tapAsync("HtmlWebpackPath", (htmlData, callback) => {
                        this.changePublicPath(htmlData, callback);
                    });
                }
            });
        }
    }
    /**
     * change hook htmlData intend to change publicPath variable in html-webpack-plugin compilation
     * @param htmlData
     * @param callback
     */
    changePublicPath(htmlData, callback) {
        const { assets } = htmlData;
        if (!this.options.publicPath) {
            callback(null, htmlData);
            return;
        }
        let jsSrcArr = [];
        const { js, publicPath } = assets;
        // replace local url to oss url
        jsSrcArr = js.map((jsItem) => jsItem.replace(publicPath, this.options.publicPath));
        htmlData.assets.js = jsSrcArr;
        callback(null, htmlData);
    }
}
module.exports = HtmlWebpackPublicPathPlugin;
//# sourceMappingURL=index.js.map