// GitHub Pages
import ghPages from "gulp-gh-pages";

export const github = () => {
    return app.gulp
        .src(`${app.path.buildFolder}/**/*.*`, {})
        .pipe(
            app.plugins.plumber(
                app.plugins.notify.onError({
                    title: "GithubPages",
                    message: "Error: <%= error.message %>",
                })
            )
        )
        .pipe(ghPages());
};
