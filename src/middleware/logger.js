export const logger = () => (next) => (action) => {
  // if (action.type === '@@router/LOCATION_CHANGE') {
  //
  // }
  return next(action);
};
