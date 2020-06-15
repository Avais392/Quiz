import React from "react";
import logo from "./assets/logo.svg";
import "./styles/App.css";
import Question from "./pages/DashboardPage";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";
import QuestionPage from "./components/Question";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import rootReducer from "./reducers";
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <div className="App">
              <Route exact path="/">
                <div class="container">
                  <div class="two">
                    <QuizPage />
                  </div>
                </div>
              </Route>

              <Route path="/dashboard">
              <div class="container">
                  <div class="two">
                <Question />
                </div>
                </div>
              </Route>

              <Route path="/result">
                <ResultPage />
              </Route>
            </div>{" "}
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
