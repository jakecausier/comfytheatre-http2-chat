let mix = require('laravel-mix');

mix.js('src/chat.js', 'public/')
   .sass('src/site.scss', 'public/')
   .version;
