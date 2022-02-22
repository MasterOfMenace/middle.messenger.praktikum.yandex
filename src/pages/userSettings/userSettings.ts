import { Templator } from '../../utils';
import userSettingsTemplate from './userSettings.tmpl';

import avatarSrc from '../../../static/images/avatar.jpg';

const context = {
  user: {
    name: 'Snoop Dogg',
    phone: '+7 (985) 123 - 45 - 44',
    avatarSrc,
  },
};

const template = new Templator(userSettingsTemplate);

const compiledTemplate = template.compile(context);

const rootDiv = document.getElementById('root');

if (rootDiv) {
  rootDiv.innerHTML = compiledTemplate;
}
