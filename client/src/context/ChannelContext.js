import { createContext, useReducer } from 'react';
import ChannelReducer from './ChannelReducer';

export const INITIAL_STATE = {
    channels: [],
    activeChannel: null,
    error: false
};

export const ChannelContext = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ChannelReducer, INITIAL_STATE);
    return(
        <ChannelContext.Provider value={{
            channels: state.channels,
            activeChannel: state.activeChannel,
            error: state.error,
            dispatch
        }}>
            {children}
        </ChannelContext.Provider>
    )
};