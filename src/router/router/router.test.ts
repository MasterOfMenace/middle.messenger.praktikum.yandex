import jsdom from 'jsdom';
import {expect} from 'chai';
import Router from './Router';
import Block from '../../components/block/Block';
import Route from '../route/Route';

const {JSDOM} = jsdom;

class TestBlock extends Block {
  render() {
    return this.compile('<div>test</div', {});
  }
}

describe('Reouter test', () => {
  const dom = new JSDOM('<!DOCTYPE html><div id="root"></div>', {
    url: 'https://my-url.com/',
  });

  global.window = dom.window as any;
  global.document = dom.window.document;

  it('Router must be an Singleton', () => {
    expect(Router.getInstance('#root')).to.equal(Router.getInstance('#root'));
  });

  it('Router must register a Route', () => {
    const router = Router.getInstance('#root');

    router.use('/path1', TestBlock).use('/path2', TestBlock).start();
    expect(router.routes).to.be.an('array').that.length(2);
    expect(router.routes[0]).to.be.an.instanceof(Route);
    expect(router.routes[1]).to.be.an.instanceof(Route);
  });

  it('Router must change location and history', () => {
    const router = Router.getInstance('#root');

    router.go('/path1');

    expect(global.window.location.pathname).to.equal('/path1');
    expect(global.window.history.length).to.equal(2);
  });
});
