import React from 'react';
import { Grid } from '@geist-ui/react';
import makeStyles from './makeStyles';
import DataCard from './DataCard';

const useStyles = makeStyles((ui) => ({
  root: {
    borderBottom: `solid 1px ${ui.palette.accents_2}`
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    width: ui.layout.pageWidthWithMargin,
    maxWidth: '100%',
    padding: `calc(${ui.layout.gap} * 2) ${ui.layout.pageMargin} calc(${ui.layout.gap} * 4)`,
    boxSizing: 'border-box',
    margin: '0 auto'
  }}))

const Public = (props) => {
  const classes = useStyles();
  const data = props.data.mockData;
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Grid.Container gap={2} justify="center">
        {data.map((e) => {return (<Grid xs={24}><DataCard data={e}/></Grid>)})}
        </Grid.Container>
      </div>
    </div>
  );
};

export default Public;
