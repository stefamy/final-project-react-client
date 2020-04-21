import { CREATE_EVENT, FIND_ALL_EVENTS } from "../common/EventsConstants";
import _ from 'lodash';

const initialState = {
  events: []
}

const eventsReducer = (state = initialState, action) => {
  let events;
  switch (action.type) {

    case CREATE_EVENT:
      events = [...state.events];
      events.push(action.event);

      return {
        events: events
      }

      case FIND_ALL_EVENTS:
        events = _.sortBy(action.events, 'date')
        return {
          events: events
        }

    default:
      return state
  }
}

export default eventsReducer;

