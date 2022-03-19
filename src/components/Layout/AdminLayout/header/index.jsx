import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import './styles.scss';

Header.propTypes = {
  showSidebar: PropTypes.bool,
  onToggleSidebar: PropTypes.func,
};

Header.defaultProps = {
  showSidebar: false,
  onToggleSidebar: null,
};

function Header(props) {
  const { showSidebar, onToggleSidebar } = props;

  const handleToggleSidebar = () => {
    if (onToggleSidebar) {
      onToggleSidebar(!showSidebar);
    }
  };

  return (
    <div className="header-grow">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className="menu-button"
            color="inherit"
            aria-label="open drawer"
            onClick={handleToggleSidebar}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography className="header-title" variant="h6" noWrap>
            CRUD
          </Typography>
          <div className="header-grow"></div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
