# Html Webpack Path Plugin

## why we need this?
Sometimes we want to upload files to OSS file server or CDN server,
in this condition you may want to change your template tag src url prefix to the OSS or CDN file url,
this plugin just do this simple things.
Supports HtmlWebpackPlugin 3.x and 4.x

## Usage
```js
plugins: [
    new HtmlWebpackPathPlugin({
        publicPath: 'your url prefix'
      }),
]
```
