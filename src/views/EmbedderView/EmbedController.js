import React, { useState } from 'react';
import { Typography, Paper, withStyles } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import SMRadio from '../../components/SMRadio';
import styles from './styles';

const EmbedController = ({
  classes, titleID, description, radioControls, radioOnChange, radioValue,
}) => {
  const renderRadio = () => {
    console.log(radioControls, radioOnChange)
    if (radioControls && radioOnChange) {
      return (
        <SMRadio initialValue={radioValue} controls={radioControls} onChange={radioOnChange} />
      );
    }
    return null;
  };

  return (
    <Paper className={classes.formContainerPaper}>
      <Typography align="left" variant="h3" color="primary"><FormattedMessage id="embedder.language.title" /></Typography>
      {
        description
        && (
          <Typography>{description}</Typography>
        )
      }
      {
        renderRadio()
      }
    </Paper>
  );
};

export default withStyles(styles)(EmbedController);
