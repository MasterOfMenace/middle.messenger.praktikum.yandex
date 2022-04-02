import {JSDOM} from 'jsdom';
import {expect} from 'chai';
import Block from './Block';

const template = `
<div className="{{className}}">{{text}}</div>
`;

type Props = {
  className: string;
  text: string;
};

class TestBlock extends Block<Props> {
  constructor(props: Props) {
    super('div', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

describe('Block test', () => {
  const dom = new JSDOM('<!DOCTYPE html><div id="root"></div>');

  global.window = dom.window as any;
  global.document = dom.window.document;

  const component = new TestBlock({
    className: 'my-class',
    text: 'Hello',
  });

  it('component must be an Block instance', () => {
    expect(component).to.be.an.instanceOf(Block);
  });

  it('component must have html element', () => {
    expect(component.getContent()).to.be.an.instanceOf(dom.window.HTMLDivElement);
  });

  it('component must change props', () => {
    component.setProps({
      text: 'Changed',
    });

    expect(component.props.text).to.equal('Changed');
  });
});
