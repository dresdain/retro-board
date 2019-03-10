import React, { SFC, useCallback } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import md5 from 'md5';
import usePreviousSessions from '../../effects/usePreviousSessions';
import List from '@material-ui/core/List';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const getGravatar = (id: string) =>
  `https://www.gravatar.com/avatar/${md5(id)}?d=retro`;

interface PreviousGamesProps extends RouteComponentProps {}

const PreviousGames: SFC<PreviousGamesProps> = ({ history }) => {
  const { previousSessions } = usePreviousSessions();
  const redirectToGame = useCallback(
    (id: string) => {
      history.push(`/game/${id}`);
    },
    [history]
  );
  return (
    <List component="section">
      {previousSessions.map(session => (
        <ListItem key={session.id} onClick={() => redirectToGame(session.id)}>
          <ListItemAvatar>
            <Avatar
              alt={session.name || 'My Retrospective'}
              src={getGravatar(session.id)}
            />
          </ListItemAvatar>
          <ListItemText primary={session.name || 'My Retrospective'} />
        </ListItem>
      ))}
    </List>
  );
};

export default withRouter(PreviousGames);