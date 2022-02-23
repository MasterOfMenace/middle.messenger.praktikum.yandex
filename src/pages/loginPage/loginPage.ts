import {formSubmitHandler, Templator} from '../../utils';
import loginPageTemplate from './loginPage.tmpl';

const template = new Templator(loginPageTemplate);

const compiled = template.compile();

const rootDiv = document.getElementById('root');

if (rootDiv) {
  rootDiv.innerHTML = compiled;
}

const form = rootDiv?.querySelector('.login-form') as HTMLFormElement;

form?.addEventListener('submit', formSubmitHandler);
form?.addEventListener('submit', (evt) => {
  evt.preventDefault();
  window.location.assign(`${window.location.origin}/placeholderPage.html`);
});
