export const FeaturedChannels = (channel) => ({
    type: "LOAD_FEATURED",
    payload: channel
})

export const ChannelSearchStart = (channel) => ({
    type: "SEARCH_START"
});

export const ChannelSearchSuccess = (channel) => ({
    type: "SEARCH_SUCCESS",
    payload: channel
});

export const SelectChannel = (channel) => ({
    type: "SELECT_CHANNEL",
    payload: channel
});

export const ResetSearch = () => ({
    type: "RESET_SEARCH"
})