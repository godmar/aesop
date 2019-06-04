
// as per https://github.com/mui-org/material-ui/tree/master/examples/nextjs

import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import TableChartIcon from '@material-ui/icons/TableChart';
import HomeIcon from '@material-ui/icons/Home';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import getConfig from 'next/config';
import dynamic from 'next/dynamic'

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

const NoSSRDummy = dynamic(
  () => import('./analytics'),
  {
    ssr: false,
  }
);

export default function MainTemplate({ children }) {
  const classes = useStyles();
  const { publicRuntimeConfig } = getConfig();
  return (
    <Container className={classes.root} maxWidth={false}>
      <NoSSRDummy />
      <AppBar className={classes.root} position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            The Æsop for Children
          </Typography>
          <Typography style={{flexGrow: 1}} align="right">
          </Typography>
          <Link href={{ pathname: `${publicRuntimeConfig.deployPath}/toc`}}>
            <IconButton color="inherit">
              <TableChartIcon />
            </IconButton>
          </Link>
          <Link href={{ pathname: `${publicRuntimeConfig.deployPath}/`}}>
            <IconButton color="inherit">
              <HomeIcon />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
      <main>{children}</main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Box className={classes.footerTextBox} mx="auto">
          <Typography variant="body1" align="center" gutterBottom>
          Web Design and Implementation by Godmar Back (godmar@gmail.com)
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            Content Source:{' '}
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
