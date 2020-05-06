import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import userReducer from "./UserReducer";
import eventReducer from "./EventReducer";
// import tasksReducer from "./TasksReducer";
// import invitesReducer from "./InvitesReducer";
import reviewsReducer from "./ReviewsReducer";

const rootReducer = (history) => combineReducers({
    user: userReducer,
    event: eventReducer,
    reviews: reviewsReducer,
    // tasks: tasksReducer,
    // invites: invitesReducer,
    router: connectRouter(history)
});

export default rootReducer;
