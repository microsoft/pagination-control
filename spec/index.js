import chai from 'chai';
import { PaginationView } from '../js/index';

const expect = chai.expect;

describe('pagination-view', function () {
  it('should be defined as a class', function () {
    expect(PaginationView).to.be.a('function');
  });
});
