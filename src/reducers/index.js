import {combineReducers} from 'redux';
// import AuthReducer from './AuthReducer';
// import EmployeeFormReducer from './EmployeeFormReducer';
// import EmployeeReducer from './EmployeeReducer';

import QuestionsReducer from './QuestionsReducer'

export default combineReducers({
 questions:QuestionsReducer
//   employeeForm: EmployeeFormReducer,
//   employees: EmployeeReducer,
});

