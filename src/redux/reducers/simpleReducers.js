const basicReducer = (state, action, prefix) => {
  switch (action.type) {
    case `${prefix}_SET_SELECTION`:
      return action.selection;
    default:
      return state;
  }
};

// Map
export const mapType = (state = 'servicemap', action) => basicReducer(state, action, 'MAPTYPE');
export const mapRef = (state = '', action) => basicReducer(state, action, 'MAPREF');
// Sort
export const direction = (state = 'desc', action) => basicReducer(state, action, 'DIRECTION');
export const order = (state = 'match', action) => basicReducer(state, action, 'ORDER');
