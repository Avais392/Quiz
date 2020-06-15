import React from 'react';
import {Scene, Router, Actions} from 'react-native-router-flux';
import QuizPage from '../src/pages/QuizPage';
import ResultPage from '../src/pages/ResultPage'

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar>
      <Scene
          key="quiz"
          component={QuizPage}
          titleStyle={{textAlign: 'center', flex: 1}}
          hideNavBar
        />
        <Scene
          key="result"
          component={ResultPage}
          titleStyle={{textAlign: 'center', flex: 1}}
          hideNavBar
        />
        {/* <Scene
          key="admin"
          component={GameOver}
          title="GameOver"
          titleStyle={{textAlign: 'center', flex: 1}}
          hideNavBar
        /> */}
      </Scene>
    </Router>
  );
};
export default RouterComponent;
