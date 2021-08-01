const dotenv = require('dotenv')
const gulp = require('gulp')
const prefix = require('gulp-autoprefixer')
const ts = require('gulp-typescript');
const sass = require('gulp-sass')(require('sass'));

const project = ts.createProject('tsconfig.json');
dotenv.config()

// Small error handler helper function.
function handleError(err: Error) {
    console.log(err.toString());
    this.emit('end');
}

const SYSTEM_SCSS = "src/scss/**/*.scss";
function compileScss() {
    let options = {
        outputStyle: 'expanded'
    };
    return gulp.src(SYSTEM_SCSS)
        .pipe(
            sass(options).on('error', handleError)
        )
        .pipe(prefix({
            cascade: false
        }))
        .pipe(gulp.dest('dist/css'));
}

gulp.task('css', compileScss);

gulp.task('compile', () => {
    return gulp.src('src/**/*.ts')
        .pipe(project())
        .pipe(gulp.dest('dist/'))
})

gulp.task('copy', async () => {
    return new Promise<void>((resolve, reject) => {
        gulp.src('README.md').pipe(gulp.dest("dist/"))
        gulp.src("src/system.json").pipe(gulp.dest("dist/"))
        gulp.src("src/template.json").pipe(gulp.dest("dist/"))
        gulp.src("src/fonts/**").pipe(gulp.dest("dist/fonts/"))
        gulp.src("src/lang/**").pipe(gulp.dest("dist/lang/"))
        gulp.src("src/module/**").pipe(gulp.dest("dist/module/"))
        gulp.src("src/packs/**").pipe(gulp.dest("dist/packs/"))
        gulp.src("src/templates/**").pipe(gulp.dest("dist/templates/"))
        resolve();
    })
})

gulp.task('build', gulp.parallel('compile', 'css', 'copy'));



// This is supposed to copy the dist folder into the modules directory for testing. Only works if you've set it up the right way
const MODULEPATH = process.env.FOUNDRY_DATA
gulp.task('foundry', () => {
    return gulp.src('dist/**').pipe(gulp.dest(`${MODULEPATH}/systems/mouseguard`))
})
gulp.task("update", gulp.series('build', 'foundry'))
