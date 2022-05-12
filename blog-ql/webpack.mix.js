const mix = require('laravel-mix')
const path = require('path')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.alias({
    '@components': path.join(__dirname, 'resources/js/components'),
    '@pages': path.join(__dirname, 'resources/js/pages'),
})

mix.js('resources/js/app.js', 'js')
    .vue()
    .postCss('resources/css/app.css', 'css', [require('tailwindcss')])

if (mix.inProduction()) {
    mix.version()
}

mix.options({
    hmrOptions: {
        host: 'localhost',
        port: 4206
    }
})
