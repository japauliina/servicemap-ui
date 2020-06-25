export default theme => ({
  appBar: {
    // padding: theme.spacing.unitDouble,
    position: 'relative',
  },
  iframeContainer: {
    maxWidth: 500,
    width: '100%',
  },
  iframeWrapper: {
    margin: theme.spacing.unitDouble,
    border: '3px dashed #666',
  },
  formContainer: {
    margin: theme.spacing.unitDouble,
  },
  formContainerPaper: {
    margin: `${theme.spacing.unitDouble}px 0`,
    padding: theme.spacing.unit,
  },
  pre: {
    backgroundColor: '#f2f2f2',
    border: '1px solid #ccc',
    borderRadius: 2,
    color: '#191919',
    display: 'block',
    fontSize: 14,
    lineHeight: 1.42857143,
    margin: '0 0 10.5px',
    padding: 10,
    textAlign: 'left',
    whiteSpace: 'normal',
    wordBreak: 'break-word',
    wordWrap: 'break-word',
  },
  textField: {
    width: '100%',
  },
});
