/* eslint-disable jsx-a11y/no-access-key */
import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, FormattedMessage } from 'react-intl';
import config from '../../../config';

const ReadSpeakerButton = ({
  className,
  encodedURL,
  intl,
  readID,
}) => {
  const locale = intl && intl.locale ? config.readspeakerLocales[intl.locale] : null;
  if (!locale || !readID) {
    return null;
  }
  return (
    <div id="readspeaker_button1" className={`rs_skip rsbtn rs_preserve ${className || ''}`}>
      <a
        rel="nofollow"
        className="rsbtn_play"
        // accessKey="L"
        title={intl.formatMessage({ id: 'general.readspeaker.title' })}
        href={`//app-eu.readspeaker.com/cgi-bin/rsent?customerid=11515&amp;lang=${locale}&amp;readid=${readID}&amp;${encodedURL ? `url=${encodedURL}` : ''}`}
      >
        <span className="rsbtn_left rsimg rspart">
          <span className="rsbtn_text">
            <FormattedMessage id="general.readspeaker.buttonText" />
          </span>
        </span>
        <span className="rsbtn_right rsimg rsplay rspart" />
      </a>
    </div>
  );
};

ReadSpeakerButton.propTypes = {
  className: PropTypes.string,
  encodedURL: PropTypes.string,
  intl: intlShape.isRequired,
  readID: PropTypes.string.isRequired,
};

ReadSpeakerButton.defaultProps = {
  className: null,
  encodedURL: null,
};

export default ReadSpeakerButton;