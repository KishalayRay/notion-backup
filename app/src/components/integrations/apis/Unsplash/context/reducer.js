const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_PHOTOS":
      return {
        ...state,
        isLoading: false,
        photos: action.payload.photos,
      };
    case "ADD_PHOTO":
      return {
        ...state,
        photos: state.photos.filter((photo) => {
          return photo.id !== action.payload;
        }),
      };
    case "SET_SEARCH":
      return {
        ...state,
        query: action.payload,
        isLoading: true,
      };
    default:
      return { ...state };
  }
};
export default Reducer;
