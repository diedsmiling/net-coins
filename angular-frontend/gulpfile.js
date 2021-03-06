var gulp = require('gulp'),
    fs      = require('fs'),
    plugins = require('gulp-load-plugins')(),
    es      = require('event-stream'),
    del     = require('del'),
    debug     = require('gulp-debug'),
    publicFolderPath = '../public',
    adminPublicFolderPath = '../public/admin',
    bc = 'bower_components',
    appsPaths = {
        'front' : {
            appJavascript:     ['app/js/app.js', 'app/js/**/*.js'],
            appTemplates:      'app/js/**/*.tpl.html',
            appMainSass:       'app/scss/main.scss',
            appStyles:         'app/scss/**/*.scss',
            appImages:         'app/images/**/*',
            faFonts:           bc+  '/font-awesome/fonts/*',
            indexHtml:         'app/index.html',
            vendorJavascript:  [bc+ '/angular/angular.js', bc+ '/ngstorage/ngStorage.js', bc+ '/angular-animate/angular-animate.js', bc + '/angular-route/angular-route.js'],
            vendorCss:         [bc + '/bootstrap-css/css/bootstrap.min.css', bc + '/font-awesome/css/font-awesome.min.css'],
            finalAppJsPath:    '/js/app.js',
            finalAppCssPath:   '/css/app.css',
            specFolder:        ['spec/**/*_spec.js'],
            publicFolder:      publicFolderPath,
            publicJavascript:  publicFolderPath + '/js',
            publicAppJs:       publicFolderPath + '/js/app.js',
            publicCss:         publicFolderPath + '/css',
            publicImages:      publicFolderPath + '/images',
            publicFonts:       publicFolderPath + '/fonts',
            publicIndex:       publicFolderPath + '/angular.html',
            publicJsManifest:  publicFolderPath + '/js/rev-manifest.json',
            publicCssManifest: publicFolderPath + '/css/rev-manifest.json'
        },
        'admin' : {
            appJavascript:     ['admin_app/js/app.js', 'admin_app/js/**/*.js'],
            appTemplates:      'admin_app/js/**/*.tpl.html',
            appMainSass:       'admin_app/scss/main.scss',
            appStyles:         'admin_app/scss/**/*.scss',
            appImages:         'admin_app/images/**/*',
            faFonts:           bc+  '/font-awesome/fonts/*',
            indexHtml:         'admin_app/admin.html',
            vendorJavascript:  [bc+ '/angular/angular.js', bc+ '/ngstorage/ngStorage.js', bc+ '/angular-animate/angular-animate.js', bc+ '/angular-route/angular-route.js'],
            vendorCss:         [bc + '/bootstrap-css/css/bootstrap.min.css', bc + '/font-awesome/css/font-awesome.min.css'],
            finalAppJsPath:    '/admin/js/app.js',
            finalAppCssPath:   '/admin/css/app.css',
            specFolder:        ['spec/**/*_spec.js'],
            publicFolder:      adminPublicFolderPath,
            publicJavascript:  adminPublicFolderPath + '/js',
            publicAppJs:       adminPublicFolderPath + '/js/app.js',
            publicCss:         adminPublicFolderPath + '/css',
            publicImages:      adminPublicFolderPath + '/images',
            publicFonts:       adminPublicFolderPath + '/fonts',
            publicIndex:       '../admin/angular.html',
            publicJsManifest:  adminPublicFolderPath + '/js/rev-manifest.json',
            publicCssManifest: adminPublicFolderPath + '/css/rev-manifest.json'
        }
    },
    appsObjects = Object.keys(appsPaths),
    paths = appsPaths['front'];

/**
 * Build angular templates and save them to cache
 *
 * @returns {*}
 */
function buildTemplates() {
    return es.pipeline(
        plugins.minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }),
        plugins.angularTemplatecache({
            module: 'adminApp'
        })
    );
}

/**
 * Add scripts task for development environment
 *
 * @param string appName
 */
function createDevelopmentScriptsTask(appName){
    var  paths = appsPaths[appName];
    gulp.task('scripts-dev-'+appName, function() {
        return gulp.src(paths.vendorJavascript.concat(paths.appJavascript, paths.appTemplates))
        .pipe(debug())
        .pipe(plugins.if(/html$/, buildTemplates()))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.concat('app.js'))
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest(paths.publicJavascript));
    });
}

/**
 * Add styles task for development environment
 *
 * @param string appName
 */
function createDevelopmentStylesTask(appName){
    var  paths = appsPaths[appName];
    gulp.task('styles-dev-'+appName, function() {
        return gulp.src(paths.vendorCss.concat(paths.appMainSass, paths.appStyles))
            .pipe(plugins.if(/scss$/, plugins.sass()))
            .pipe(plugins.concat('app.css'))
            .pipe(gulp.dest(paths.publicCss))
            .pipe(plugins.notify("App: "+appName+". Development styles processed!"));
    });
}

/**
 * Add images task for both environments
 *
 * @param string appName
 */
function createImagesTask(appName){
    var  paths = appsPaths[appName];
    gulp.task('images-'+appName, function() {
        return gulp.src(paths.appImages)
            .pipe(gulp.dest(paths.publicImages));
    });
}

/**dif
 * Add fonts task for both environments
 *
 * @param string appName
 */
function createFontsTask(appName){
    var  paths = appsPaths[appName];
    gulp.task('fonts-'+appName, function() {
        return gulp.src(paths.faFonts)
            .pipe(gulp.dest(paths.publicFonts));

    });
}

/**
 * Add scripts task for production environment
 *
 * @param string appName
 */
function createProductionScriptsTask(appName){
    var  paths = appsPaths[appName];
    gulp.task('scripts-prod-'+appName, function() {
        return gulp.src(paths.vendorJavascript.concat(paths.appTemplates, paths.appJavascript))
            .pipe(plugins.if(/html$/, buildTemplates()))
            .pipe(plugins.concat('app.js'))
            .pipe(plugins.ngAnnotate())
            .pipe(plugins.uglify())
            .pipe(plugins.rev())
            .pipe(gulp.dest(paths.publicJavascript))
            .pipe(plugins.rev.manifest({path: 'rev-manifest.json'}))
            .pipe(gulp.dest(paths.publicJavascript));
    });
}

/**
 * Add styles task for production environment
 *
 * @param string appName
 */
function createProductionStylesTask(appName) {
    var  paths = appsPaths[appName];
    gulp.task('styles-prod'+appName, function() {
        return gulp.src(paths.vendorCss.concat(paths.appMainSass))
            .pipe(plugins.if(/scss$/, plugins.sass()))
            .pipe(plugins.concat('app.css'))
            .pipe(plugins.minifyCss())
            .pipe(plugins.rev())
            .pipe(gulp.dest(paths.publicCss))
            .pipe(plugins.rev.manifest({path: 'rev-manifest.json'}))
            .pipe(gulp.dest(paths.publicCss));
    });
}

/**
 * Add index task for development environment
 *
 * @param string appName
 */
function createDevelopmentIndexTask(appName) {
    var  paths = appsPaths[appName];
    gulp.task('indexHtml-dev-'+appName, ['scripts-dev-'+appName, 'styles-dev-'+appName], function() {5
        var manifest = {
            js: paths.finalAppJsPath,
            css: paths.finalAppCssPath
        };

        return gulp.src(paths.indexHtml)
            .pipe(plugins.template({css: manifest['css'], js: manifest['js']}))
            .pipe(plugins.rename(paths.publicIndex))
            .pipe(gulp.dest(paths.publicFolder));
    });
}

/**
 * Add index task for production environment
 *
 * @param string appName
 */
function createProductionIndexTask(appName) {
    var  paths = appsPaths[appName];
    gulp.task('indexHtml-prod-'+appName, ['scripts-prod-'+appName, 'styles-prod-'+appName], function() {
        var jsManifest  = JSON.parse(fs.readFileSync(paths.publicJsManifest, 'utf8')),
            cssManifest = JSON.parse(fs.readFileSync(paths.publicCssManifest, 'utf8')),
            prefix = (appName == 'admin' ? 'admin' : ''),
            manifest = {
            js: prefix + '/js/' + jsManifest['app.js'],
            css: prefix + '/css/' + cssManifest['app.css']
        };

        return gulp.src(paths.indexHtml)
            .pipe(plugins.template({css: manifest['css'], js: manifest['js']}))
            .pipe(plugins.rename(paths.publicIndex))
            .pipe(gulp.dest(paths.publicFolder));
    });
}

/**
 * Add lint task
 *
 * @param string appName
 */
function createLintTask(appName){
    var  paths = appsPaths[appName];
    gulp.task('lint-'+appName, function() {
        return gulp.src(paths.appJavascript.concat(paths.specFolder))
            .pipe(plugins.jshint())
            .pipe(plugins.jshint.reporter('jshint-stylish'));
    });
}

gulp.task('clean', function(cb) {
    appsObjects.forEach(function(appName){
        var  paths = appsPaths[appName];
        del([paths.publicJavascript, paths.publicImages, paths.publicCss, paths.publicIndex], {force: true});
    });
});

appsObjects.forEach(function(appName) {
    createDevelopmentScriptsTask(appName);
    createDevelopmentStylesTask(appName);
    createImagesTask(appName);
    createFontsTask(appName);
    createProductionScriptsTask(appName);
    createProductionStylesTask(appName);
    createDevelopmentIndexTask(appName);
    createProductionIndexTask(appName);
    createLintTask(appName);
});


gulp.task('watch', ['indexHtml-dev-front', 'indexHtml-dev-admin', 'images-admin', 'images-front', 'fonts-admin', 'fonts-front'], function() {
    appsObjects.forEach(function(appName){
        gulp.watch(appsPaths[appName].appJavascript, ['lint-'+appName, 'scripts-dev-'+appName]);
        gulp.watch(appsPaths[appName].appTemplates, ['scripts-dev-'+appName]);
        gulp.watch(appsPaths[appName].vendorJavascript, ['scripts-dev-'+appName]);
        gulp.watch(appsPaths[appName].appImages, ['images-'+appName]);
        gulp.watch(appsPaths[appName].faFonts, ['fonts-'+appName]);
        gulp.watch(appsPaths[appName].specFolder, ['lint-'+appName]);
        gulp.watch(appsPaths[appName].indexHtml, ['indexHtml-dev-'+appName]);
        gulp.watch(appsPaths[appName].appStyles, ['styles-dev-'+appName]);
        gulp.watch(appsPaths[appName].vendorCss, ['styles-dev-'+appName]);
    });
});

gulp.task('default', ['watch']);
gulp.task('production', [
    'scripts-prod-front',
    'scripts-prod-admin',
    'styles-prod-front',
    'styles-prod-admin',
    'images-admin',
    'images-front',
    'indexHtml-prod-prod',
    'indexHtml-prod-admin']);


