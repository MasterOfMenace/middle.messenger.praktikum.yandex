import {Templator} from '../../utils';
import loginPageTemplate from './loginPage.tmpl';

const template = new Templator(loginPageTemplate);

const compiled = template.compile();

const rootDiv = document.getElementById('root');

if (rootDiv) {
  rootDiv.innerHTML = compiled;
}
