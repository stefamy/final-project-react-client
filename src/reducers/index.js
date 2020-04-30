import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import userReducer from "./UserReducer";
import eventsReducer from "./EventsReducer";
import assignmentsReducer from "./AssignmentsReducer";
import invitesReducer from "./InvitesReducer";
import reviewsReducer from "./ReviewsReducer";

const rootReducer = (history) => combineReducers({
    user: userReducer,
    events: eventsReducer,
    assignments: assignmentsReducer,
    invites: invitesReducer,
    reviews: reviewsReducer,
    router: connectRouter(history)
});

export default rootReducer;
