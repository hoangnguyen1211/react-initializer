import React, { Component } from 'react';
import { Switch, Router, Redirect} from 'react-router-dom';
import Template from './hocs/Templates';
import history from './shared/history'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

export const PageURL = {
    LoginURL: '/login',
    DashboardURL: '/dashboard'
}

const routes = (
    <Switch>
        <Template.TemplateLogin path={PageURL.LoginURL} Component={Login} />
        <Template.TemplatePrivate path={PageURL.DashboardURL} Component={Dashboard}/>
        <Redirect to={PageURL.DashboardURL} />
    </Switch>
)


class App extends Component {
    render(){
        return (
            <Router history={history}>
                {routes}
            </Router>
        )
    }
}
export default App;
