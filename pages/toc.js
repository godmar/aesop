import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import getConfig from 'next/config';

import MainTemplate from '../src/MainTemplate';
import stories from '../src/stories';

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const useStyles = makeStyles(theme => ({
  tableOfContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 1)
  },
}));

export default function Toc() {
  const { publicRuntimeConfig } = getConfig();
  const classes = useStyles();
  return (
    <MainTemplate>
      <Typography className={classes.tableOfContent} variant="h4">
        Table of Content
      </Typography>
      <List>
        {stories.map((s, cardindex) => (
          <ListItemLink key={cardindex}
                href={`${publicRuntimeConfig.deployPath}/story/${cardindex + 1}`}
              >
            <ListItemText primary={`${cardindex+1}. ${s.title}`} />
          </ListItemLink>
        ))}
      </List>
    </MainTemplate>
  );
}
