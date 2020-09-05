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
import Router from 'next/router';

import MainTemplate from './MainTemplate';
import cards from './stories';

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

export default function Album() {
  const classes = useStyles();
  const { publicRuntimeConfig } = getConfig();

  return (
    <MainTemplate title="The Æsop for Children">
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
          <Typography variant="body2" align="center">
            with Pictures by Milo Winter.
          </Typography>
          <Typography variant="body2" align="center">
            Published by Rand McNally & Co.; Chicago, 1919.
          </Typography>
        </Container>
      </div>
      {/* End hero unit */}
      <Container className={classes.cardGrid} maxWidth="xl">
        <Grid container spacing={4}>
          {cards.map((card, cardindex) => {
            const navTarget = `${publicRuntimeConfig.deployPath}/story/[storyid]`;
            const asPath = `${publicRuntimeConfig.deployPath}/story/${cardindex + 1}`;

            return <Grid item key={`${cardindex} ${card.title}`} xs={12} sm={6} md={4} lg={3} xl={2}>
              <Card className={classes.card}>
                <CardMedia
                  onClick={() => Router.push({ ...navTarget, asPath }) }
                  className={classes.cardMedia}
                  image={`${publicRuntimeConfig.staticFolder}/${
                    Array.isArray(card.image) ? card.image[0] : (card.image || '19994-h/images/title_th.jpg')
                  }`}
                  title={card.title}
                />
                <CardContent className={classes.cardContent}>
                  <NextLink href={navTarget} as={asPath} >
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.title}
                    </Typography>
                  </NextLink>
                </CardContent>
              </Card>
            </Grid>;
          })}
        </Grid>
      </Container>
    </MainTemplate>
  );
}
