import {LoginPage} from './pages/loginPage/loginPage';
import {MainPage} from './pages/mainPage/mainPage';
import {SignupPage} from './pages/signUpPage/signUpPage';
import {Router} from './router';

const router = Router.getInstance('#root');

router.use('/', MainPage).use('/login', LoginPage).use('/signup', SignupPage).start();
