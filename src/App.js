import { BrowserRouter, Route, Switch, useHistory} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Provider } from "react-redux";
import store from "./store";
import Layout from './hocs/Layout';
import ResetPasswordConfirm from "./pages/ResetPasswordConfirm";
import ResetPassword from "./pages/ResetPassword";
import Activate from "./pages/Activate";
import Main from './pages/Main';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Newsletter from './pages/Newsletter';
import Contact from './pages/Contact';
import "./index.css"
import Courses from './pages/Courses';
import MockE from './pages/MockE';
import Tests from './pages/Tests';
import Forum from './pages/Forum';
import Id from './pages/Id';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter history={useHistory}>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/main" component={Main} />
            <Route exact path="/main/dashboard" component={Dashboard} />
            <Route exact path="/main/courses" component={Courses} />
            <Route exact path="/main/mock-e" component={MockE} />
            <Route exact path="/main/tests" component={Tests} />
            <Route exact path="/main/forum" component={Forum} />
            <Route exact path="/about" component={About} />
            <Route exact path="/blog" component={Newsletter} />
            <Route exact path="/blog/:id" component={Id} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/reset-password" component={ResetPassword} />
            <Route exact path="/password/reset/confirm/:uid/:token" component={ResetPasswordConfirm} />
            <Route exact path="/activate/:uid/:token" component={Activate} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
