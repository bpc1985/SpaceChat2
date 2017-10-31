import React from 'react';
import { Scene, Router, Actions, Stack} from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import Main from './components/Main';
import SmartApp from './components/SmartApp';
import Chat from './components/Chat';

const RouterComponent = () => {
  return (
    <Router>
      <Stack hideNavBar>
        <Scene key="auth">
          <Scene key="login" component={LoginForm} title="Please Login" />
        </Scene>
        <Scene key="main" component={Main} title="Main" />
        <Scene key="smartApp" component={SmartApp} title="SmartApp" />
        <Scene key="chat" component={Chat} title="Chat" />
      </Stack>
    </Router>
  );
};

export default RouterComponent;
