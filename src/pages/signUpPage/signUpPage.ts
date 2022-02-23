import {Templator} from '../../utils';
import signUpPageTmpl from './signUpPage.tmpl';

const template = new Templator(signUpPageTmpl);

const compiled = template.compile();

const rootDiv = document.getElementById('root');

if (rootDiv) {
  rootDiv.innerHTML = compiled;
}
