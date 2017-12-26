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
        apiKey: "AIzaSyByMofnTizQjeTiXcj7qetQYFInIPen8EU",
        authDomain: "ng5firegallery.firebaseapp.com",
        databaseURL: "https://ng5firegallery.firebaseio.com",
        projectId: "ng5firegallery",
        storageBucket: "ng5firegallery.appspot.com",
        messagingSenderId: "37945654226"
    }
}
