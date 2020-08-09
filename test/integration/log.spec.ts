import chai, { should as chaiShould } from 'chai';
import chaiHttp from 'chai-http';
import { equal, deepStrictEqual } from 'assert';
import app from '../../src';
import { buildApiPrefix, createToken } from '../../src/utils';
import { ADMIN_KEY } from '../../src/services/admin.service';

chai.use(chaiHttp);

const should = chaiShould();
const ADMIN_ID = '5ecabe0a9b408e2b3cf5478b';
const PAYLOAD = {
    id: ADMIN_ID,
    sub: ADMIN_ID,
};

describe('Integration | Logs endpoints', () => {
    describe('GET /logs', () => {
        it('should fail getting logs when no auth token present', (done) => {
            chai.request(app)
                .get(buildApiPrefix('logs', ''))
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });
        it('should get logs when authenticated', (done) => {
            chai.request(app)
                .get(buildApiPrefix('logs', ''))
                .set('Authorization', createToken(PAYLOAD, ADMIN_KEY))
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    const { success, data } = res.body;
                    equal(success, true, 'api successfully was called');
                    data.should.be.a('array');
                    done();
                });
        });
    });
});
