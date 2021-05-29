import React, { useState }  from 'react';
import { Button } from '@geist-ui/react';
import makeStyles from './makeStyles';
import MyDropzone from './MyDropzone'
import SignUp from './auth/SignUp';

import * as Icons from 'react-feather';

const useStyles = makeStyles((ui) => ({
  root: {
    backgroundColor: ui.palette.accents_1,
  },
  content: {
    width: ui.layout.pageWidthWithMargin,
    maxWidth: '100%',
    boxSizing: 'border-box',
    margin: '0 auto',
    padding: `calc(${ui.layout.gap} * 2) ${ui.layout.pageMargin} calc(${ui.layout.gap} * 4)`,
    transform: 'translateY(-35px)'
  },
  invite: {
    display: 'flex',
  },
  inviteHeading: {
    marginBottom: 18,
    fontSize: '14px !important',
  },
  row: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    minWidth: 1,
    maxWidth: '100%',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  projects: {
    width: '100%'
  },
  activity: {
    flex: 1
  },
  [`@media screen and (min-width: ${ui.layout.pageWidthWithMargin})`]: {
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    projects: {
      width: 540,
      maxWidth: '100%',
      marginRight: 80
    },
    activityTitle: {
      marginTop: '20 !important',
      fontSize: '14px !important',
      textAlign: 'start !important'
    },
    viewAll: {
      marginBottom: '0 !important',
      textAlign: 'start !important'
    },
    invite: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  },
  viewAll: {
    fontSize: 14,
    fontWeight: 700,
    marginBottom: ui.layout.gap,
    textAlign: 'center'
  },
  activityTitle: {
    fontWeight: 700,
    marginTop: ui.layout.gap,
    fontSize: 24,
    textAlign: 'center'
  }
}));

const Content = () => {
  const [modal, setModal] = useState(true);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <MyDropzone />
      
      </div>
      <Button
        className={classes.addressButton}
        size='small'
        auto
        icon={<Icons.Plus />}
        type='secondary'
        onClick={() => setModal(true)}
      >
        Signup test Modal
      </Button>
    </div>
  );
};

export default Content;
