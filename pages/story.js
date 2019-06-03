import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box, Button, IconButton, Grid } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useSpring, animated, config as springConfig } from 'react-spring';

import MainTemplate from '../src/MainTemplate';
import ReactMarkdown from '../src/Markdown';
import getConfig from 'next/config';

const allStories = (ctx => {
  let keys = ctx.keys().map(f => f.replace('./', '').replace('/meta.json', ''));
  let values = ctx.keys().map(ctx);
  return values.reduce((acc, cur, i) => ({...acc, [keys[i]]: cur }), {});
})(require.context('../content', true, /\/meta\.json/));

const allBodies = (ctx => {
  let keys = ctx.keys().map(f => f.replace('./', '').replace('/main.md', ''));
  let values = ctx.keys().map(ctx);
  return values.reduce((acc, cur, i) => ({...acc, [keys[i]]: cur.default }), {});
})(require.context('../content', true, /\/main\.md/));

const useStyles = makeStyles(theme => ({
  storyContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(0, 1, 0, 1)  // top right bottom left
  },
  storyTitle: {
    margin: theme.spacing(2, 1, 1, 2)
  },
  // https://stackoverflow.com/questions/2076284/scaling-images-proportionally-in-css-with-max-width
  storyImage: {
    [theme.breakpoints.down('md')]: {
      maxWidth: 200
    },
    [theme.breakpoints.between('md', 'lg')]: {
      maxWidth: 300
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: 700
    },
    height: 'auto'
  },
  storyLesson: {
    fontStyle: 'italic'
  }
}));

function Story({ name }) {
  const body = allBodies[name];
  const { title, image, lesson } = allStories[name];
  const classes = useStyles();
  const [ showLesson, setShowLesson ] = useState(false);
  const fadeInShowLesson = useSpring({
    to: { opacity: showLesson ? 1 : 0 },
    config: springConfig.molasses // really slow
  });
  const fadeOutButton = useSpring({
    to: { opacity: showLesson ? 0 : 1 },
    config: springConfig.slow // really slow
  });
  const { publicRuntimeConfig } = getConfig();
  const lessons = Array.isArray(lesson) ? lesson : [lesson];

  return (
    <MainTemplate>
      <Typography className={classes.storyTitle} variant="h5">
        {title}
      </Typography>
      <Box
        display="flex"
        alignItems="flex-start"
        p={1}
        m={1}
        bgcolor="background.paper"
      >
        <ReactMarkdown>
          {`<img src="${publicRuntimeConfig.staticFolder}/${image}"
                 style="float:right; padding: 4px" class="${
                   classes.storyImage
                 }" />\n${body}`}
        </ReactMarkdown>
      </Box>
      <Box display="flex">
        <Box mx="auto" p={1}>
          {showLesson ? (
            <animated.div style={fadeInShowLesson}>
              <Grid container alignItems="center">
                <Grid item>
                  {lessons.map(lesson => (
                    <Typography key={lesson} className={classes.storyLesson} variant="body1">
                      {lesson}
                    </Typography>
                  ))}
                </Grid>
                <Grid item>
                  <IconButton onClick={() => setShowLesson(false)}>
                    <CloseIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </animated.div>
          ) : (
            <animated.div style={fadeOutButton}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setShowLesson(true)}
              >
                Click here to see the lesson
              </Button>
            </animated.div>
          )}
        </Box>
      </Box>
    </MainTemplate>
  );
}

Story.getInitialProps = async ({ query }) => {
  return { ...query };
}

export default Story;
