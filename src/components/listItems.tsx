import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const MainListItems = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <ListItemButton
        onClick={() => navigate('/dashboard')}
        selected={location.pathname === '/dashboard'}
      >
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary='Dashboard' />
      </ListItemButton>
      <ListItemButton
        onClick={() => navigate('/dashboard/users')}
        selected={location.pathname === '/dashboard/users'}
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary='Users' />
      </ListItemButton>
    </React.Fragment>
  );
};
