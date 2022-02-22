import { Templator } from '../../utils';
import mainPageTemplate from './mainPage.tmpl';

const template = new Templator(mainPageTemplate);

const compiled = template.compile();

const rootDiv = document.getElementById('root');

if (rootDiv) {
  rootDiv.innerHTML = compiled;
}
