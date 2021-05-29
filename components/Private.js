import React from 'react';
import makeStyles from './makeStyles';
import ProfileCard from './profile/ProfileCard';

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
  },
  projects: {
    width: 540,
    maxWidth: '100%',
    marginRight: 80,
  }
}));

const Private = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.projects}>
          <ProfileCard
            heading='Your DID'
            address='did:3:gafyreideiwcju2cwecccxesr7woyufadeot67ifhrn7kuefmlqpqgrloeq'
            name='3BOX'
          />
        </div>
      </div>
      </div>
  );
};

export default Private;
