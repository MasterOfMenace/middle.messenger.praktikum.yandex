import {expect} from 'chai';
import HTTPTransport from './HTTPTransport';

const httpTransport = new HTTPTransport('http://fakeurl.com');

describe('HTTP transport method existing tests', () => {
  it('should have a method get', () => {
    expect(httpTransport).to.have.property('get');
  });
  it('should have a method post', () => {
    expect(httpTransport).to.have.property('post');
  });
  it('should have a method put', () => {
    expect(httpTransport).to.have.property('put');
  });
  it('should have a method delete', () => {
    expect(httpTransport).to.have.property('delete');
  });
});

describe('HTTP transport work tests', () => {
  it('method get should return a promise', () => {
    expect(httpTransport.get('/someurl')).to.be.an.instanceOf(Promise);
  });
  it('method post should return a promise', () => {
    expect(httpTransport.post('/someurl')).to.be.an.instanceOf(Promise);
  });
  it('method put should return a promise', () => {
    expect(httpTransport.put('/someurl')).to.be.an.instanceOf(Promise);
  });
  it('method delete should return a promise', () => {
    expect(httpTransport.delete('/someurl')).to.be.an.instanceOf(Promise);
  });
});
