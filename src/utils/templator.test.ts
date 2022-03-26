import {expect} from 'chai';
import Templator from './templator';

const template = `
  <div class="{{className}}">
    {{text}}
  </div>`;

const context = {
  className: 'my-class',
  text: 'Hello World',
};

const element = new Templator(template).compile(context);

describe('Templator base test', () => {
  it('should return compiled template correctly', () => {
    expect(
      element,
      `<div class="my-class">
    Hello World
  </div>`,
    );
  });
});
