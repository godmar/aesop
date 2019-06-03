
// as per https://github.com/mui-org/material-ui/tree/master/examples/nextjs

import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import NextLink from './Link';

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
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
      <main>
        {children}
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="body1" align="center" gutterBottom>
          Source: <NextLink href="https://www.gutenberg.org/ebooks/19994">
            Project Gutenberg
          </NextLink>
        </Typography>
      </footer>
      {/* End footer */}
    </Container>
  );
}
