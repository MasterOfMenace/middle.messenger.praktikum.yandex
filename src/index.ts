import {ChangePasswordPage} from './pages/changePassword/changePassword';
import {ChatPage} from './pages/chatPage/chatPage';
import {Error404} from './pages/error404/error404';
import {Error500} from './pages/error500/error500';
import {LoginPage} from './pages/loginPage/loginPage';
import {MainPage} from './pages/mainPage/mainPage';
import {SignupPage} from './pages/signUpPage/signUpPage';
import {UserSettings} from './pages/userSettings/userSettings';
import {Router} from './router';

const router = Router.getInstance('#root');

router
  .use('/', MainPage)
  .use('/login', LoginPage)
  .use('/signup', SignupPage)
  .use('/user-settings', UserSettings)
  .use('/change-password', ChangePasswordPage)
  .use('/chat', ChatPage)
  .use('/404', Error404)
  .use('/500', Error500)
  .start();
