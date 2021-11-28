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

function compileTs() {
    return gulp.src('src/**/*.ts')
        .pipe(project())
        .pipe(gulp.dest('dist/'))

}

function compileScss() {
    const options = {
        outputStyle: 'expanded'
    };
    return gulp.src(SYSTEM_SCSS, { since: gulp.lastRun(compileScss) })
        .pipe(
            sass(options).on('error', handleError)
        )
        .pipe(prefix({
            cascade: false
        }))
        .pipe(gulp.dest('dist/css'));
}

function copyToDist() {
    const sinceLastRun = { since: gulp.lastRun(copyToDist) }
    return new Promise<void>((resolve, reject) => {
        gulp.src("README.md", sinceLastRun).pipe(gulp.dest("dist/"))
        gulp.src("src/system.json", sinceLastRun).pipe(gulp.dest("dist/"))
        gulp.src("src/template.json", sinceLastRun).pipe(gulp.dest("dist/"))
        gulp.src("src/fonts/**", sinceLastRun).pipe(gulp.dest("dist/fonts/"))
        gulp.src("src/lang/**", sinceLastRun).pipe(gulp.dest("dist/lang/"))
        gulp.src("src/module/**", sinceLastRun).pipe(gulp.dest("dist/module/"))
        gulp.src("src/packs/**", sinceLastRun).pipe(gulp.dest("dist/packs/"))
        gulp.src("src/templates/**", sinceLastRun).pipe(gulp.dest("dist/templates/"))
        resolve();
    })
}

// This is supposed to copy the dist folder into the modules directory for testing. 
// Only works if you've set it up the right way
function copyToFoundry() {
    const MODULEPATH = process.env.FOUNDRY_DATA
    if (MODULEPATH) {
        return gulp.src('dist/**').pipe(gulp.dest(`${MODULEPATH}/systems/mouseguard`))
    }
    else {
        console.log("FOUNDRY_DATA not set. Provide a path as either an envvar or in a .env file to automatically update a Foundry directory.")
        return gulp.src(".")
    }
}

gulp.task("css", compileScss)
gulp.task("compile", compileTs)
gulp.task("copy", copyToDist)
gulp.task("foundry", copyToFoundry)
const build = gulp.series("compile", "css", "copy")
const update = gulp.series(build, "foundry")
const watch = function () {
    gulp.watch("src/", update)
}
console.log(watch)
exports.build = build
exports.update = update
exports.watch = watch
exports.default = update