const ADD_QUESTION = "ADD_QUESTION";
const FETCH_QUESTIONS = "FETCH_QUESTIONS";
const ADD_PERCENTILES = "ADD_PERCENTILES";
const ADD_CATEGORY = "ADD_CATEGORY";

export default (
  state = { questions: [], page: "quiz", categories: [] ,percentiles:[],category:{}},
  action
) => {
  switch (action.type) {
    case ADD_QUESTION:
      return {
        questions: [
          ...state.questions,
          { [action.question.id]: action.question },
        ],
      };
    case FETCH_QUESTIONS:
      return { ...state, questions: action.questions };
    case ADD_PERCENTILES:
      return { ...state, percentiles: action.percentiles };
    case "SET_USER":
      return { ...state, user: action.user };
    case ADD_CATEGORY:
      console.log(action.category);
      return { ...state, categories: [...state.categories, action.category] };
    case "FETCH_CATEGORIES":
      console.log(action.categories)
      return { ...state, categories: action.categories };
      case 'SET_PERSONALITY_CATEGORY':
        return {...state,category:action.category}
    default:
      return state;
  }
};
