import {formSubmitHandler, Templator} from '../../utils';
import signUpPageTmpl from './signUpPage.tmpl';

const template = new Templator(signUpPageTmpl);

const compiled = template.compile();

const rootDiv = document.getElementById('root');

if (rootDiv) {
  rootDiv.innerHTML = compiled;
}

const form = rootDiv?.querySelector('.signup-form') as HTMLFormElement;

form?.addEventListener('submit', formSubmitHandler);
