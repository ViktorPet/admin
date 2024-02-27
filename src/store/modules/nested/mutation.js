export const UPDATE_ELEMENTS = (state, payload) => {
    console.log(payload);
    console.log(state);
    state.elements = payload;
};