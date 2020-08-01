import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import passport from 'passport';
import passportInit from './passport';
import { connect } from './database';
import environment from './utils/environment';
import * as routes from './routes';

// port is now available to the Node.js runtime
// as if it were an environment variable
const port = process.env.PORT || environment.SERVER_PORT;
const app = express();

// connect to db
print('Connecting to DB', '');
connect().then((db) => {
    print('Setting up Middlewares', '');
    // Body Parser Middleware
    const bodyOptions = {
        limit: '10mb',
    };
    app.use(bodyParser.json(bodyOptions));

    // CORS Middleware
    app.use(cors());

    // set no-cache
    app.use((_, res, next) => {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        next();
    });

    // Helmet Middleware
    // Helmet will set up some security headers for us
    app.use(helmet());

    // configure passport
    app.use(passport.initialize());
    app.use(passport.session());

    // set up the passport strategy
    passportInit(passport, db.UserModel, db.AdminModel);

    // Configure routes
    print('Initializing Routes', '');
    routes.admin(app, db);
    routes.post(app, db);
    routes.tag(app, db);
    routes.user(app, db);
    routes.series(app, db);
    routes.comment(app, db);
    routes.report(app, db);
    routes.feature(app, db);
    routes.privacyPolicy(app, db);
    routes.music(app, db);
    routes.quote(app, db);
    routes.receipt(app, db);

    // start the Express server
    app.listen(port, () => {
        print('Server Started', `Listening on port: ${port}`);
    });
});

function print(stage: string, message: string): void {
    printHeader(stage);
    console.log(message);
    printDivider();
}
function printHeader(stage: string): void {
    const MAX_HEIGHT = 4;
    printDivider();
    let i;
    for (i = 0; i < MAX_HEIGHT / 2; i++) {
        console.log('=');
    }
    console.log(`=           ${stage}             `);
    for (i = 0; i < MAX_HEIGHT / 2; i++) {
        console.log('=');
    }
    printDivider();
}
function printDivider(): void {
    console.log('==================================');
}
