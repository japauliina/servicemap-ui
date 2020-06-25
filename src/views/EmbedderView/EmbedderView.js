import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'react-intl';
import {
  Typography, AppBar, Paper, TextField,
} from '@material-ui/core';
import URI from 'URIjs';
import * as smurl from './url';
import isClient from '../../utils';
import SMRadio from '../../components/SMRadio';
import SettingsUtility from '../../utils/settings';
import { getEmbedURL, getLanguage } from './utils';
import EmbedController from './EmbedController';

const config = {
  DOMAIN: null,
  LANGUAGE: {
    palvelukartta: 'fi',
    servicekarta: 'sv',
    servicemap: 'en',
  },
  LANGUAGES: {
    en: 'english',
    sv: 'svenska',
    fi: 'suomi',
  },
  BACKGROUND_MAPS: SettingsUtility.mapSettings,
  CITIES: SettingsUtility.citySettings,
  DEFAULT_IFRAME_PROPERTIES: {
    style: {
      width: '100%',
      height: '100%',
    },
    frameBorder: 0,
  },
  DEFAULT_CUSTOM_WIDTH: '400',
  BASE_URL: '/embedder',
};

// SERVICE_URL = "http://palvelukartta.hel.fi/unit?service=33423"
// UNIT_URL = "http://palvelukartta.hel.fi/unit/8215"
// ADDRESS_URL = "http://palvelukartta.hel.fi/address/helsinki/lontoonkatu/6"
// BBOX_URL = "http://palvelukartta.hel.fi/?bbox=60.201456226,24.8981159927,60.190874505,24.8834907630&level=none"
// const SERVICE_URL = 'http://localhost:2048/unit?service=33423';
// const UNIT_URL = 'http://localhost:2048/unit/8215';
// const ADDRESS_URL = 'http://localhost:2048/address/helsinki/lontoonkatu/6';
// const BBOX_URL = 'http://localhost:2048/?bbox=60.201456226,24.8981159927,60.190874505,24.8834907630&level=none';
// url = smurl.verify SERVICE_URL
// #url = smurl.verify ADDRESS_URL
// #url = smurl.verify UNIT_URL
// #url = smurl.verify BBOX_URL

const languageControls = Object.keys(config.LANGUAGES).map(lang => ({
  value: lang,
  label: config.LANGUAGES[lang],
}));
console.log('Controls:', languageControls);

const mapControls = config.BACKGROUND_MAPS.map(map => ({
  value: map,
  label: map,
}));
console.log('Controls:', mapControls);

const cityControls = config.CITIES.map(city => ({
  value: city || 'all',
  label: city || 'Kaikki',
}));
console.log('Controls:', cityControls);

const EmbedderView = ({ classes, intl }) => {
  // Verify url
  const data = isClient() ? smurl.verify(window.location.href) : {};
  let { url, ratio } = data;

  const initialRatio = ratio || 62;
  if (url) {
    url = smurl.strip(url, {});

    /*
    test = {
      url: data.url,
      initialBbox: parameters.resource || parameters.query.bbox,
      initialRatio,
      parameters: smurl.explode(windowUrl),
    };
    */
  }
  console.log(url);
  let search = {};
  if (url) {
    const uri = URI(url);
    search = uri.search(true);
  }
  console.log(getLanguage(config.BACKGROUND_MAPS[0]));

  const defaultMap = search.map || config.BACKGROUND_MAPS[0];
  const defaultLanguage = getLanguage(url);
  const defaultCity = search.city || 'all';

  // States
  const [ratioHeight, setRatioHeight] = useState(initialRatio);
  const [language, setLanguage] = useState(defaultLanguage);
  const [map, setMap] = useState(defaultMap);
  const [city, setCity] = useState(defaultCity);
  const [eWidth, setWidth] = useState(defaultCity);
  const [eHeight, setHeight] = useState(defaultCity);

  let height;
  const iframeConfig = config.DEFAULT_IFRAME_PROPERTIES || {};
  const customWidth = config.DEFAULT_CUSTOM_WIDTH || 100;
  const fixedHeight = config.DEFAULT_CUSTOM_WIDTH;
  const heightMode = 'ratio';

  const renderWrapperStyle = () => `position: relative; width:100%; padding-bottom:${ratioHeight}%;`;
  const embedUrl = getEmbedURL(url, { language, map, city });

  // Figure out iFrameHTML
  const iframeHtml = (url) => {
    if (!url) {
      return '';
    }
    let html;
    if (heightMode === 'fixed') { height = fixedHeight; }
    if (heightMode === 'ratio') {
      if (iframeConfig.style && iframeConfig.style.width === '100%') {
        html = `<div style="${renderWrapperStyle()}">
          <iframe style="position: absolute; top: 0; left: 0; border: none; width: 100%; height: 100%;"
          src="${embedUrl}"></iframe></div>`;
      }
    } else {
      height = parseInt(parseInt(customWidth, 10) * (parseInt(ratioHeight, 10) / 100.0), 10);
    }

    if (height) {
      const width = iframeConfig.style && iframeConfig.style.width ? iframeConfig.style.width : 100;
      const widthUnit = width !== '100%' ? 'px' : '';
      html = `<iframe style="border: none; width: ${width}${widthUnit}; height: ${height}px;"
                  src="${embedUrl}"></iframe>`;
    }
    return html;
  };

  /**
   * Renders embed HTMl based on options
   */
  const renderEmbedHTML = () => {
    const htmlText = iframeHtml(data.url);
    return (
      <pre className={classes.pre}>
        { htmlText }
      </pre>
    );
  };

  /**
   * Renders preview embed in iframe
   * @param {*} html 
   * @param {*} props 
   */
  const renderIFrame = (html, props) => {
    if (!html) {
      return null;
    }
    return (
      <div {...props} dangerouslySetInnerHTML={{ __html: html }} />
    );
  };

  /**
   * Render address for embed url
   */
  const renderEmbedURL = () => {
    
    return (
      <Paper className={classes.formContainerPaper}>
        <Typography align="left" variant="h3" color="primary"><FormattedMessage id="embedder.url.title" /></Typography>
        <TextField
          id="embed-address"
          className={classes.textField}
          value={embedUrl}
          margin="normal"
          variant="outlined"
        />
      </Paper>
    );
  };

  /**
   * Render language controls
   */
  const renderLanguageControl = () => {
    console.log('language', language);

    const description = language ? <FormattedMessage id={`embedder.language.description.${language}`} /> : null;

    return (
      <EmbedController
        titleID="embedder.language.title"
        description={description}
        radioValue={language}
        radioControls={languageControls}
        radioOnChange={(e, v) => setLanguage(v)}
      />
    );
  };

  /**
   * Render map controls
   */
  const renderMapTypeControl = () => {
    console.log('map', map);
    return (
      <EmbedController
        titleID="embedder.map.title"
        description={null}
        radioValue={map}
        radioControls={mapControls}
        radioOnChange={(e, v) => setMap(v)}
      />
    );
  };

  /**
   * Render city controls
   */
  const renderCityControl = () => {
    console.log('city', city);
    return (
      <EmbedController
        titleID="embedder.city.title"
        description={null}
        radioValue={city}
        radioControls={cityControls}
        radioOnChange={(e, v) => setCity(v)}
      />
    );
  };

  /**
   * Render height controls
   */
  const renderHeightControl = () => {
    const controls = [
      {
        value: 'relative',
        label: intl.formatMessage({ id: 'embedder.height.relative.label' }),
      },
      {
        value: 'absolute',
        label: intl.formatMessage({ id: 'embedder.height.absolute.label' }),
      },
    ];

    return (
      <EmbedController
        titleID="embedder.height.title"
        description={null}
        radioValue={null}
        radioControls={controls}
        radioOnChange={(e, v) => setWidth(v)}
      />
    );
  };

  /**
   * Render width controls
   */
  const renderWidthControl = () => {
    const controls = [
      {
        value: 'auto',
        label: intl.formatMessage({ id: 'embedder.width.auto.label' }),
      },
      {
        value: 'custom',
        label: intl.formatMessage({ id: 'embedder.width.custom.label' }),
      },
    ];

    return (
      <EmbedController
        titleID="embedder.width.title"
        description={null}
        radioValue={null}
        radioControls={controls}
        radioOnChange={null}
      />
    );
  };

  return (
    <div>
      <AppBar className={classes.appBar}>
        <Typography align="left" variant="h2" color="inherit">
          <FormattedMessage id="embedder.title" />
        </Typography>
        <p className="lead" />
      </AppBar>

      <div>
        <div className={classes.iframeContainer} style={{ width: '100%' }}>
          {
            renderIFrame(
              iframeHtml(url, iframeConfig.style),
              { className: classes.iframeWrapper },
            )
          }
        </div>
        <div className={classes.formContainer}>
          <form>
            {
              renderEmbedURL()
            }
            {
              renderLanguageControl()
            }
            {
              renderMapTypeControl()
            }
            {
              renderCityControl()
            }
            {
              renderWidthControl()
            }
            {
              renderHeightControl()
            }
          </form>
          {
            renderEmbedHTML()
          }
        </div>

      </div>
    </div>
  );
};


export default EmbedderView;
