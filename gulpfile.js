const dotenv = require('dotenv');
const gulp = require('gulp');
const prefix = require('gulp-autoprefixer');
const sass = require('gulp-sass')(require('sass'));
const { exec } = require('child_process')

dotenv.config()

// Small error handler helper function.
function handleError(err) {
    console.log(err.toString());
    this.emit('end');
}

const SYSTEM_SCSS = "src/scss/**/*.scss";

function compileTs() {
    // This is significantly faster on subsequent builds than gulp-typescript
    // or other packages which don't properly handle incremental builds for TS.
    return exec("npx tsc")
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
    const watches = [
        "src/system.json",
        "src/template.json",
        "src/fonts/**",
        "src/lang/**",
        "src/packs/**",
        "src/templates/**",
    ]

    const getDistPath = (p) => {
        return p.dirname.replace("src", "dist")
    }
    return gulp.src(watches).pipe(gulp.dest(getDistPath));
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
exports.build = build
exports.update = update
exports.watch = watch
exports.default = update