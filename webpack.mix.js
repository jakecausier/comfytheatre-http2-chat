let mix = require('laravel-mix');

mix.js('src/chat.js', 'public/')
   .sass('src/site.scss', 'public/')
   .options({
   		processCssUrls: false
   })
   .version;
