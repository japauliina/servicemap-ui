import React from 'react';
import PropTypes from 'prop-types';
import { ButtonBase, Typography } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

// ServiceMapButton
const SMButton = ({
  children,
  classes,
  intl,
  className,
  small,
  color,
  icon,
  messageID,
  onClick,
  margin,
  srText,
  style,
  role,
  ...rest
}) => {
  const colorStyle = classes[color] || '';
  const buttonIcon = icon ? React.cloneElement(icon, { className: classes.buttonIcon }) : null;
  const buttonClasses = `${classes.button} ${small ? classes.smallButton : ''} ${margin ? classes.margin : classes.marginRight} ${className} ${colorStyle}`;
  const textClasses = classes.typography;

  let buttonTitle = null;

  if (srText) {
    buttonTitle = srText;
  } else if (messageID) {
    buttonTitle = intl.formatMessage({ id: messageID });
  }

  return (
    <ButtonBase
      aria-label={buttonTitle}
      className={buttonClasses}
      icon={buttonIcon}
      onClick={onClick}
      role={role || 'link'}
      style={{
        ...style,
      }}
      variant="contained"
      {...rest}
      focusVisibleClassName={color === 'primary' ? classes.primaryFocus : null}
    >
      {
        icon
      }
      {
        messageID
        && (
          <Typography aria-hidden color="inherit" component="p" variant="caption" className={textClasses}>
            <FormattedMessage id={messageID} />
          </Typography>
        )
      }
      {
        !messageID
        && children
      }
    </ButtonBase>
  );
};

SMButton.propTypes = {
  icon: PropTypes.objectOf(PropTypes.any),
  className: PropTypes.string,
  color: PropTypes.oneOf(['primary', 'secondary', 'default']),
  margin: PropTypes.bool,
  small: PropTypes.bool,
  messageID: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  srText: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.any),
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  children: PropTypes.node,
  role: PropTypes.string,
  disabled: PropTypes.bool,
  intl: PropTypes.objectOf(PropTypes.any).isRequired,
};

SMButton.defaultProps = {
  children: null,
  className: '',
  small: false,
  color: 'default',
  icon: null,
  margin: false,
  messageID: null,
  srText: null,
  style: null,
  role: null,
  disabled: false,
};

export default SMButton;
