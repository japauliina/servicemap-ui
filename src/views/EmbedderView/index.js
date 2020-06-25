import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import EmbedderView from './EmbedderView';
import styles from './styles';

export default injectIntl(withStyles(styles)(EmbedderView));
