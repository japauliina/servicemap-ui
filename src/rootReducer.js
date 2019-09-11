import { combineReducers } from 'redux';
import breadcrumb from './redux/reducers/breadcrumb';
import navigator from './redux/reducers/navigator';
import { units, service, selectedUnit } from './redux/reducers/fetchDataReducer';
import user from './redux/reducers/user';
import districts from './redux/reducers/district';
import event from './redux/reducers/event';
import address from './redux/reducers/address';
import {
  colorblind, hearingAid, mobility, visuallyImpaired,
} from './redux/reducers/settings';
import {
  direction, order, mapRef, mapType, settingsToggled,
} from './redux/reducers/simpleReducers';

// Export all redux reducers here
export default combineReducers({
  breadcrumb,
  mapType,
  mapRef,
  navigator,
  units,
  user,
  districts,
  service,
  selectedUnit,
  event,
  address,
  settings: combineReducers({
    toggled: settingsToggled,
    colorblind,
    hearingAid,
    mobility,
    visuallyImpaired,
  }),
  sort: combineReducers({
    direction,
    order,
  }),
});
