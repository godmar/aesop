// as per https://github.com/mui-org/material-ui/tree/master/examples/nextjs

import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import NextLink from './Link';
import getConfig from 'next/config';

import MainTemplate from './MainTemplate';

const useStyles = makeStyles(theme => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6, 0, 0)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    backgroundPosition: 'center top'
  },
  cardContent: {
    flexGrow: 1
  }
}));

const allStories = (ctx => {
  const values = ctx.keys().map(el => ({
    index: el.replace('./', '').replace('/meta.json', ''),
    value: ctx(el)
  }));
  values.sort((a, b) => Number(a.index) - Number(b.index));
  return values.map(obj => obj.value);
})(require.context('../content', true, /\/meta\.json/));

const cards = allStories.slice(0, 90)

export default function Album() {
  const classes = useStyles();
  const { publicRuntimeConfig } = getConfig();

  return (
    <MainTemplate>
      {/* Hero unit */}
      <div className={classes.heroContent}>
        <Container maxWidth="lg">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            The Æsop for Children
          </Typography>
        </Container>
      </div>
      {/* End hero unit */}
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {cards.map((card, cardindex) => (
            <Grid item key={card.title} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={`${publicRuntimeConfig.staticFolder}/${card.image}`}
                    title={card.title}
                  />
                  <CardContent className={classes.cardContent}>
                    <NextLink href={{ pathname: `${publicRuntimeConfig.deployPath}/story/${cardindex+1}`}}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.title}
                      </Typography>
                    </NextLink>
                  </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </MainTemplate>
  );
}
