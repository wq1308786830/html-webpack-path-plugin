declare class HtmlWebpackPublicPathPlugin {
    private options;
    constructor(options: any);
    apply(compiler: any): void;
    /**
     * change hook htmlData intend to change publicPath variable in html-webpack-plugin compilation
     * @param htmlData
     * @param callback
     */
    changePublicPath(htmlData: any, callback: Function): void;
}
export = HtmlWebpackPublicPathPlugin;
