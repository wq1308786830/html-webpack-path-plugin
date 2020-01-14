# Html Webpack Path Plugin
--

## why I need this?
Sometimes you will want to upload files to OSS file server or CDN server,
in this condition you may want to change your src url to the OSS or CDN file URL,
this plugin just do this simple things.
Supports HtmlWebpackPlugin 3.x and 4.x

## Usage
```js
plugins: [
    new HtmlWebpackPathPlugin({
        publicPath: ossDllPath
      }),
]
```
