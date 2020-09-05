import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import getConfig from 'next/config';
import Link from 'next/link';

import MainTemplate from '../src/MainTemplate';
import stories from '../src/stories';

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
    <MainTemplate title="The Æsop for Children - Table of Contents">
      <Typography className={classes.tableOfContent} variant="h4">
        Table of Content
      </Typography>
      <List>
        {stories.map((s, cardindex) => (
          <ListItem button key={cardindex}>
            <Link
              href={`${publicRuntimeConfig.deployPath}/story/[storyid]`}
              as={`${publicRuntimeConfig.deployPath}/story/${cardindex + 1}`}
            >
              <ListItemText primary={`${cardindex + 1}. ${s.title}`} />
            </Link>
          </ListItem>
        ))}
      </List>
    </MainTemplate>
  );
}
