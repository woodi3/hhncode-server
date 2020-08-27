import app from '../../src';

before((done) => {
    app.on('ready', () => {
        done();
    });
});
