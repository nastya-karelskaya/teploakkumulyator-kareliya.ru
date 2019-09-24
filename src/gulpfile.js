var gulp        = require('gulp');
var bs          = require('browser-sync');
var gutil       = require( 'gulp-util' );
var ftp         = require( 'vinyl-ftp' );
args        = require('yargs').argv;
var autoprefixer = require('gulp-autoprefixer');
var sass        = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var minifyjs = require('gulp-js-minify');
var replace = require('gulp-replace');

const minify = require('gulp-minify');


/************ js minify */
gulp.task('js-old', function(){
  gulp.src('src/js/*.js')
		.pipe(minifyjs())
    .pipe(gulp.dest('src/js/min'));
});




gulp.task('compressjs', function() {

	var t = args.t;

	if(t == 'dev') {
		var destination = 'dev';
	}

	if(t == 'prod') {
		var destination = 'prod';
	}

	gulp.src(['src/js/custom.js', 
						'src/js/device.js', 
						'src/js/google-map.js', 
						'src/js/menuScrollable.js',
						'src/js/validate.js'
						
					])
    .pipe(minify())
    .pipe(gulp.dest(destination+'/js/'))
});

gulp.task('compressjs2', function() {

	var t = args.t;

	if(t == 'dev') {
		var destination = 'dev';
	}

	if(t == 'prod') {
		var destination = 'prod';
	}

	gulp.src(['src/admin/js/custom.js'
						
					])
    .pipe(minify())
    .pipe(gulp.dest(destination+'/admin/js/'))
});





/************************css minify */

gulp.task('mcss', function() {
	gulp.src(['src/css/apple-device.css',
						'src/css/apples.css',		
						'src/css/device.css',
						'src/css/index.css',
						'src/css/ipad.css',
						'src/css/iphone.css',
						'src/css/*.css',						
])
			.pipe(cssmin())
			.pipe(rename({suffix: '.min'}))
			.pipe(gulp.dest('src/css/min/'));
});


/****************** css prefixer */

gulp.task('auprefx', function() {
	gulp.src('src/css/*.css')
			.pipe(autoprefixer({
					browsers: ['last 2 versions'],
					cascade: false
			}))
			.pipe(gulp.dest('src/css/'));					
});


/*************************replace path */

gulp.task('repath', function(){
  gulp.src(['./src/css/style_.css'])
    .pipe(replace('url("/img/background.jpg")', 'url("../img/background.jpg");'))
    .pipe(gulp.dest('./src/css/'));
});










gulp.task('bigprod', function(){

	var a = args.a;

	if(a == 'dev') {
		var destination = 'dev';
	}

	if(a == 'prod') {
		var destination = 'prod';
	}


	/****************** css prefixer */

	gulp.src('src/css/*.css')
			.pipe(autoprefixer({
					browsers: ['last 7 versions'],
					cascade: false
			}))
			.pipe(gulp.dest('src/css/'));					




	/**** minify js */
	gulp.src(['src/js/custom.js', 
	'src/js/device.js', 
	'src/js/google-map.js', 
	'src/js/menuScrollable.js',
	'src/js/validate.js'
	
	])
	.pipe(minify())
	.pipe(gulp.dest(destination + '/js/'));


	gulp.src(['src/admin/js/custom.js'
						
					])
		.pipe(minify())
		.pipe(gulp.dest(destination + '/admin/js/'));


	/******* minify css */

	gulp.src([
						'src/css/apples.css',		
						'src/css/index.css',
						'src/css/ipad.css',
						'src/css/iphone.css',
						'src/css/mac.css',
						'src/css/notebook.css',
						'src/css/phones.css',		
						'src/css/phototech.css',		
						'src/css/tablet.css'					
	])
			.pipe(cssmin())
			.pipe(rename({suffix: '.min'}))
			.pipe(gulp.dest(destination + '/css/'));



	/*************************replace path */

	gulp.src(['./src/index.html', 
						'./src/remont-apple.html', 
						'./src/remont-fotoapparatov.html', 
						'./src/remont-ipad.html', 
						'./src/remont-iphone.html', 
						'./src/remont-macbook.html', 
						'./src/remont-noutbukov.html', 
						'./src/remont-planshetov.html', 
						'./src/remont-telefonov.html'
])
		.pipe(replace('custom.js', 'custom-min.js'))
		// .pipe(replace('<link rel="stylesheet" href="css/index.css">', '<link rel="stylesheet" href="css/index-min.css">'))
		.pipe(replace('device.js', 'device-min.js'))
		.pipe(replace('google-map.js', 'google-map-min.js'))
		.pipe(replace('menuScrollable.js', 'menuScrollable-min.js'))
		.pipe(replace('validate.js', 'validate-min.js'))

		.pipe(replace('apples.css', 'apples.min.css'))
		.pipe(replace('index.css', 'index.min.css'))
		.pipe(replace('ipad.css', 'ipad.min.css'))
		.pipe(replace('iphone.css', 'iphone.min.css'))
		.pipe(replace('mac.css', 'mac.min.css'))
		.pipe(replace('notebook.css', 'notebook.min.css'))
		.pipe(replace('phones.css', 'phones.min.css'))
		.pipe(replace('phototech.css', 'phototech.min.css'))
		.pipe(replace('tablet.css', 'tablet.min.css'))
		.pipe(gulp.dest('./' + destination));
		


		return [ 
			gulp.src('./src/css/bootstrap.min.css').pipe(gulp.dest(destination + '/css/')),
			gulp.src('./src/robots.txt').pipe(gulp.dest(destination + '/')),
			gulp.src('./src/.htaccess').pipe(gulp.dest(destination + '/')),
			//gulp.src('./src/index_new.html').pipe(gulp.dest(destination + '/')),
			gulp.src('./src/img/**').pipe(gulp.dest(destination + '/img/')),
			//gulp.src('./src/fonts/**').pipe(gulp.dest('/fonts/')),
			gulp.src(['./src/js/bootstrap.min.js', './src/js/jquery-1.9.1.min.js', './src/js/jquery-3.3.1.min.js']).pipe(gulp.dest(destination + '/js/')),
			gulp.src('./src/php/**').pipe(gulp.dest(destination + '/php/')),
			//gulp.src('./src/*.html').pipe(gulp.dest(dirName+'/')),
			gulp.src('./src/admin/.htaccess').pipe(gulp.dest(destination + '/admin/')),
			gulp.src('./src/admin/*.php').pipe(gulp.dest(destination + '/admin/')) //,
			//gulp.src('./src/*.php').pipe(gulp.dest(dirName+'/'))
		];



});

/*************************replace path */

gulp.task('repath', function(){
  gulp.src(['./src/css/style_.css'])
    .pipe(replace('url("/img/background.jpg")', 'url("../img/background.jpg");'))
    .pipe(gulp.dest('./src/css/'));
});







/*******************************production */

gulp.task('production', ['auprefx'], function() {

	var a = args.a;

	if(a == 'prod') {
		var dirName = 'production';
	}

	if(a == 'dev') {
		var dirName = 'dev';
	}

	return [ 
					gulp.src('./src/css/*.css').pipe(gulp.dest(dirName+'/css/')),
					gulp.src('./src/img/**').pipe(gulp.dest(dirName+'/img/')),
					//gulp.src('./src/fonts/**').pipe(gulp.dest('/fonts/')),
					gulp.src('./src/js/*').pipe(gulp.dest(dirName+'/js/')),
					gulp.src('./src/mailer/**').pipe(gulp.dest(dirName+'/mailer/')),
					gulp.src('./src/*.html').pipe(gulp.dest(dirName+'/')),
					gulp.src('./src/admin/**').pipe(gulp.dest(dirName+'/admin/')),
					gulp.src('./src/*.php').pipe(gulp.dest(dirName+'/'))
				];
});




/*********************** bsync */

gulp.task('bsync', function() {
	var a = args.a;

	if(a == 'd') {

		bs.init({
			server:  "./dev"
		});

		gulp.watch(["dev/*.html", "dev/css/*.css"]).on('change', bs.reload);

	}
	else {

		bs.init({
			server:  "./src"
		});

		gulp.watch(["src/*.html", "src/css/*.sass"]).on('change', bs.reload);

	}
  

  

});



/*************** deploy */


gulp.task('deploy', function () {

	var conn = ftp.create( {
		
		host:			'89.108.85.65',
		user:     'nessy209',
		password: 'cWqA649reC',
		parallel: 10,
		log:      gutil.log
	} );


	
	var a = args.a;
	

	if(a == 'prod') {
		
		var globs = 'prod/**';

		var myBase = 'prod/';

		var destination = '/';

	}

	if(a == 'dev') {
		
		var globs = 'dev/**';

		var myBase = 'dev/';

		var destination = '/dev';


	}

	

	return gulp.src( globs, { base: myBase, buffer: false } )
		//.pipe( conn.newer( '/www/nastyakarelskaya.ru/smartfix-ptz.ru/dev' ) ) ;// only upload newer files
		.pipe( conn.dest( '/www/nastyakarelskaya.ru/smartfix-ptz.ru'+destination) );

});




/********************* deploy light */
gulp.task('deploy-l', function () {

	var conn = ftp.create( {
		
		host:			'89.108.85.65',
		user:     'nessy209',
		password: 'cWqA649reC',
		parallel: 10,
		log:      gutil.log
	} );


	
	var a = args.a;
	


	

	return gulp.src( './src/' + a + '/**', { base: './src/' + a + '/', buffer: false } )
		//.pipe( conn.newer( '/www/nastyakarelskaya.ru/smartfix-ptz.ru/dev' ) ) ;// only upload newer files
		.pipe( conn.dest( '/www/nastyakarelskaya.ru/smartfix-ptz.ru'+ '/'+ a ) );

});


/******************default */

gulp.task('default', ['bsync']);

