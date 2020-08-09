import chai, { should as chaiShould } from 'chai';
import chaiHttp from 'chai-http';
import { equal, deepStrictEqual } from 'assert';
import app from '../../src';
import { buildApiPrefix, createToken } from '../../src/utils';
import { ADMIN_KEY } from '../../src/services/admin.service';

chai.use(chaiHttp);

const should = chaiShould();
const ADMIN_ID = '5ecabe0a9b408e2b3cf5478b';
const ADMIN_PAYLOAD = {
    id: ADMIN_ID,
    sub: ADMIN_ID,
};

describe('Integration | Post endpoints', () => {
    describe('GET routes', () => {
        it('should fail getting posts for admin without token', (done) => {
            chai.request(app)
                .get(buildApiPrefix('posts', ''))
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });
        it('should get posts for admin', (done) => {
            chai.request(app)
                .get(buildApiPrefix('posts', ''))
                .set('Authorization', createToken(ADMIN_PAYLOAD, ADMIN_KEY))
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    const { success, posts } = res.body;
                    equal(success, true, 'api successfully was called');
                    posts.should.be.a('array');

                    done();
                });
        });
        it('should get posts for client', (done) => {
            chai.request(app)
                .get(buildApiPrefix('posts', '/client'))
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    const { success, posts } = res.body;
                    equal(success, true, 'api successfully was called');
                    posts.should.be.a('array');

                    const containsDrafts = posts.filter((p: any) => p.isDraft).length > 0;

                    equal(containsDrafts, false, 'does not retrieve posts that are draft');

                    done();
                });
        });
        it('should search posts for client', (done) => {
            chai.request(app)
                .get(buildApiPrefix('posts', '/search'))
                .query({ title: 'Lulu' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    const { success, posts } = res.body;
                    equal(success, true, 'api successfully was called');
                    posts.should.be.a('array');

                    const containsDrafts = posts.filter((p: any) => p.isDraft).length > 0;

                    equal(containsDrafts, false, 'does not retrieve posts that are draft');

                    done();
                });
        });
    });
});
