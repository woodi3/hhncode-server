import { equal, deepStrictEqual } from 'assert';
import { buildApiPrefix, cleanQuery, didDelete } from '../../src/utils';

describe('Unit | Utils methods', () => {
    describe('buildApiPrefix', () => {
        it('should return api prefix correctly', () => {
            const expectedVal = '/v1/admin/checkToken';
            equal(buildApiPrefix('admin', '/checkToken'), expectedVal);
        });
    });

    describe('didDelete', () => {
        it('should return correct boolean value', () => {
            equal(didDelete({ deletedCount: 1 }), true);
            equal(didDelete({}), false);
        });
    });

    describe('cleanQuery', () => {
        it('should remove empty query params', () => {
            const expectedQuery = {
                query: {
                    someVal: 'yup',
                    someOtherVal: 'yup2',
                },
                or: undefined,
            };
            const testQuery = {
                someVal: 'yup',
                someOtherVal: 'yup2',
                someEmptyVal: '',
            };
            deepStrictEqual(cleanQuery(testQuery, false), expectedQuery, 'test with createOr set to false');
        });
        it('should create an mongoose or query', () => {
            const expectedQuery = {
                query: {
                    someVal: 'yup',
                    someOtherVal: 'yup2',
                },
                or: [
                    {
                        someVal: {
                            $regex: 'yup',
                            $options: 'i',
                        },
                    },
                    {
                        someOtherVal: {
                            $regex: 'yup2',
                            $options: 'i',
                        },
                    },
                ],
            };
            const testQuery = {
                someVal: 'yup',
                someOtherVal: 'yup2',
                someEmptyVal: '',
            };
            deepStrictEqual(cleanQuery(testQuery, true), expectedQuery, 'test with createOr set to true');
        });
    });
});
