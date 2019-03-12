let mix = require('laravel-mix');

mix.js('src/chat.js', 'public/')
   .sass('src/site.scss', 'public/')
   .options({
   		processCssUrls: false
   })
   .copy('node_modules/@fortawesome/fontawesome-free/css/all.css', 'public/fontawesome/fontawesome.css')
   .copy('node_modules/@fortawesome/fontawesome-free/webfonts/',  'public/webfonts/')
   .version;
