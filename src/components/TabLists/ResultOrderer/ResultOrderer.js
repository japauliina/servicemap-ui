/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  MenuItem, FormControl, InputLabel, Select,
} from '@material-ui/core';

const allowedDirections = [
  'asc',
  'desc',
];

const allowedOrders = [
  'match',
  'alphabetical',
];

class ResultOrderer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      direction: 'desc',
      order: 'match',
    };
  }

  isValidDirection = direction => direction && allowedDirections.indexOf(direction) > -1;

  isValidOrder = order => order && allowedOrders.indexOf(order) > -1;

  handleChange = (event) => {
    const {
      data, sortCallback, orderingFunction,
    } = this.props;
    const array = event.target.value.split('-');
    const direction = array[1];
    const order = array[0];

    if (this.isValidDirection(direction) && this.isValidOrder(order) && data) {
      const newData = orderingFunction(data, direction, order);
      sortCallback(newData);
    }

    this.setState({
      direction,
      order,
    });
  };

  render() {
    const { classes } = this.props;
    const { direction, order } = this.state;
    return (
      <form className={`${classes.root} ${classes.primaryColor}`} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="result-sorter"><FormattedMessage id="sorting.label" /></InputLabel>
          <Select
            value={`${order}-${direction}`}
            onChange={this.handleChange}
            inputProps={{
              name: 'sorter',
              id: 'result-sorter',
            }}
          >
            <MenuItem value="match-desc"><FormattedMessage id="sorting.match.desc" /></MenuItem>
            <MenuItem value="alphabetical-desc"><FormattedMessage id="sorting.alphabetical.desc" /></MenuItem>
            <MenuItem value="alphabetical-asc"><FormattedMessage id="sorting.alphabetical.asc" /></MenuItem>
          </Select>
        </FormControl>
      </form>
    );
  }
}

ResultOrderer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  sortCallback: PropTypes.func.isRequired,
  orderingFunction: PropTypes.func.isRequired,
};

export default ResultOrderer;