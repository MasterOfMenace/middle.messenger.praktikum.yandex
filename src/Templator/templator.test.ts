import {expect} from 'chai';
import Templator from './templator';

describe('Templator base test', () => {
  it('should return simple compiled template correctly', () => {
    const template = `
    <div class="{{className}}">
      {{text}}
    </div>`;

    const expectResult = `
    <div class="my-class">
      Hello World
    </div>`;

    const context = {
      className: 'my-class',
      text: 'Hello World',
    };

    expect(new Templator(template).compile(context)).to.equal(expectResult);
  });

  it('should return nested compiled template correctly', () => {
    const template = `
    <div class="{{className}}">
      <p>{{text}}</p>
      <div class="{{nestedElem.className}}">
        <span>{{nestedElem.text}}</span>
      </div>
    </div>`;

    const expectedResult = `
    <div class="my-class">
      <p>Hello World</p>
      <div class="my-nested-class">
        <span>Nested Text</span>
      </div>
    </div>`;

    const context = {
      className: 'my-class',
      text: 'Hello World',
      nestedElem: {
        className: 'my-nested-class',
        text: 'Nested Text',
      },
    };

    expect(new Templator(template).compile(context)).to.equal(expectedResult);
  });
});
