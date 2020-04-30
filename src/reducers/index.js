import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import userReducer from "./UserReducer";
import eventsReducer from "./EventsReducer";
import tasksReducer from "./TasksReducer";
import invitesReducer from "./InvitesReducer";
import reviewsReducer from "./ReviewsReducer";

const rootReducer = (history) => combineReducers({
    user: userReducer,
    events: eventsReducer,
    tasks: tasksReducer,
    invites: invitesReducer,
    reviews: reviewsReducer,
    router: connectRouter(history)
});

export default rootReducer;
