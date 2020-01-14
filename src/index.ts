import _ from "lodash";
import HtmlWebpackPlugin from 'html-webpack-plugin';

class HtmlWebpackPublicPathPlugin {
    private options: any;
    constructor(options: any) {
        this.options = _.extend(
            {
                publicPath: ""  // publicPath you want to apply
            },
            options
        );
    }

    apply(compiler: any): void {
        if (compiler.hooks) {
            // webpack 4 support
            compiler.hooks.compilation.tap("HtmlWebpackPath", (compilation: any) => {
                // Static Plugin interface |compilation |HOOK NAME | register listener
                // support HtmlWebpackPlugin 3.x
                if (compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing) {
                    compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync(
                        "HtmlWebpackOss",
                        (htmlData: any, callback: Function) => {
                            this.changePublicPath(htmlData, callback);
                        }
                    );
                } else {
                    // support HtmlWebpackPlugin 4.x
                    // @ts-ignore
                    HtmlWebpackPlugin.getHooks(
                        compilation
                    ).beforeAssetTagGeneration.tapAsync(
                        "HtmlWebpackPath",
                        (htmlData: any, callback: Function) => {
                            this.changePublicPath(htmlData, callback);
                        }
                    );
                }
            });
        }
    }

    /**
     * change hook htmlData intend to change publicPath variable in html-webpack-plugin compilation
     * @param htmlData
     * @param callback
     */
    changePublicPath(htmlData: any, callback: Function): void {
        const { assets } = htmlData;
        if (!this.options.publicPath) {
            callback(null, htmlData);
            return;
        }
        let jsSrcArr: Array<String> = [];
        const { js, publicPath } = assets;

        // replace local url to oss url
        jsSrcArr = js.map((jsItem: String) =>
            jsItem.replace(publicPath, this.options.publicPath)
        );
        htmlData.assets.js = jsSrcArr;

        callback(null, htmlData);
    }
}

export = HtmlWebpackPublicPathPlugin;
