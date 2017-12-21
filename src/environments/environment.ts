// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    recaptcha: {
        siteKey: "6Lc04xQUAAAAAHGgj0DaIVLzJrQUmr_-oXrbhbu5",
        clientKey: "6Lc04xQUAAAAACQ7vQYUfQqF-SI16BD9g3rtt7bt"
    },
    firebase: {
        apiKey: "AIzaSyB-qEzUod8TIqPjFBamLpY248cKqtDsjUA",
        authDomain: "ng5fire-gallery.firebaseapp.com",
        databaseURL: "https://ng5fire-gallery.firebaseio.com",
        projectId: "ng5fire-gallery",
        storageBucket: "ng5fire-gallery.appspot.com",
        messagingSenderId: "967932819471"
    }
}
