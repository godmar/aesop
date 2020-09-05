import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box, Button, IconButton, Grid } from '@material-ui/core';
import { useMorph } from 'react-morph';

import MainTemplate from '../../src/MainTemplate';
import ReactMarkdown from '../../src/Markdown';
import getConfig from 'next/config';
//import { useRouter } from 'next/router';

const allStories = (ctx => {
  let keys = ctx.keys().map(f => f.replace('./', '').replace('/meta.json', ''));
  let values = ctx.keys().map(ctx);
  return values.reduce((acc, cur, i) => ({...acc, [keys[i]]: cur }), {});
})(require.context('../../content', true, /\/meta\.json/));

const allBodies = (ctx => {
  let keys = ctx.keys().map(f => f.replace('./', '').replace('/main.md', ''));
  let values = ctx.keys().map(ctx);
  return values.reduce((acc, cur, i) => ({...acc, [keys[i]]: cur.default }), {});
})(require.context('../../content', true, /\/main\.md/));

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

function Story({ params }) {
  const { storyid: name } = params;
  const body = allBodies[name];
  const { title, image, lesson } = allStories[name];
  const images = Array.isArray(image) ? image : image ? [image] : [];
  const classes = useStyles();
  const [ showLesson, setShowLesson ] = useState(false);
  const { publicRuntimeConfig } = getConfig();
  const morph = useMorph();
  const lessons = Array.isArray(lesson) ? lesson : [lesson];

  return (
    <MainTemplate title={`The Æsop for Children - ${title}`}>
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
          {images.map((image, i) =>
              `<img src="${publicRuntimeConfig.staticFolder}/${image}"
                 style="float:${i%2 ? 'left' : 'right'}; padding: 4px" class="${
                   classes.storyImage
                 }" />`
            ).join('') + `\n${body}`}
        </ReactMarkdown>
      </Box>
      <Box display="flex">
        <Box mx="auto" p={1}>
          {showLesson ? (
            <Grid {...morph} container alignItems="center" onClick={() => setShowLesson(false)}>
              <Grid item>
                {lessons.map(lesson => (
                  <Typography
                    key={lesson}
                    className={classes.storyLesson}
                    variant="body1"
                  >
                    {lesson}
                  </Typography>
                ))}
              </Grid>
            </Grid>
          ) : (
            <Button
              {...morph}
              variant="contained"
              color="primary"
              onClick={() => setShowLesson(true)}
            >
              Click here to see the lesson
            </Button>
          )}
        </Box>
      </Box>
    </MainTemplate>
  );
}

// https://github.com/vercel/next.js/issues/9524
// `getStaticPaths` allows the user to return a list of parameters to
// render to HTML at build time.
export async function getStaticPaths() {
  const ctx = require.context('../../content', true, /\/meta\.json/);
  const files = ctx.keys(); // e.g. [./1/meta.json, ...]
  const paths = files.map(f => f.replace('./', '').replace('/meta.json', ''))
     .map((cur) => ({ params: { storyid: cur } }));

  const rc = {
    paths: paths,
    // https://github.com/vercel/next.js/blob/master/errors/invalid-getstaticpaths-value.md
    // false means show 404 if a route isn't matched
    fallback: false
  };
  return rc;
}

// `getStaticProps` gets a `params` object holding the dynamic parameters
export async function getStaticProps(params) {
  return {
      props: params
  };
}

export default Story;
