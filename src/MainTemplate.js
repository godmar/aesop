
// as per https://github.com/mui-org/material-ui/tree/master/examples/nextjs

import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  },
  footerTextBox: {
    maxWidth: 600
  },
  root: {
    paddingLeft: 0,
    paddingRight: 0
  }
}));

export default function Album({ children }) {
  const classes = useStyles();

  return (
    <Container className={classes.root} maxWidth={false}>
      <AppBar className={classes.root} position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            The Æsop for Children
          </Typography>
        </Toolbar>
      </AppBar>
      <main>{children}</main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Box className={classes.footerTextBox} mx="auto">
          <Typography variant="body1" align="center" gutterBottom>
            Source:{' '}
            <a href="https://www.gutenberg.org/ebooks/19994">
              Project Gutenberg
            </a>
          </Typography>
          <Typography variant="body2" align="center" gutterBottom>
            This eBook is for the use of anyone anywhere at no cost and with
            almost no restrictions whatsoever. You may copy it, give it away or
            re-use it under the terms of the Project Gutenberg License included
            with this eBook or online at www.gutenberg.org
          </Typography>
        </Box>
      </footer>
      {/* End footer */}
    </Container>
  );
}
