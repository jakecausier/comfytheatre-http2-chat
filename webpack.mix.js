let mix = require('laravel-mix');

mix.js('src/chat.js', 'public/')
	 .js('src/chat.js', '/var/www/comfytheatre/html/wp-content/themes/comfytheatre-2019/src/js/')
   .sass('src/site.scss', 'public/')
   .options({
   		processCssUrls: false
   })
   .copy('node_modules/@fortawesome/fontawesome-free/css/all.css', 'public/fontawesome/fontawesome.css')
   .copy('node_modules/@fortawesome/fontawesome-free/webfonts/',  'public/webfonts/')
   .version;
