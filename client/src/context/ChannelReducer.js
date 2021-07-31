import { INITIAL_STATE } from "./ChannelContext";

const ChannelReducer = (state, action) => {
    switch(action.type){
        case "SEARCH_START":
            return {
                channels: [],
                activeChannel: null,
                error: false,
            }
        case "SEARCH_SUCCESS": 
        case "LOAD_FEATURED":
            return {
                channels: [action.payload],
                activeChannel: null,
                error: false
            }
        case "SELECT_CHANNEL":
            return {
                channels: [],
                activeChannel: action.payload,
                error: false
            }
        case "RESET_SEARCH": 
            return INITIAL_STATE
        default:
            return state
    }
};

export default ChannelReducer;