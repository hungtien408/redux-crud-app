import { Drawer } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import './styles.scss';

SideBar.propTypes = {
  showSidebar: PropTypes.bool,
  onToggleSidebar: PropTypes.func,
};

SideBar.defaultProps = {
  showSidebar: false,
  onToggleSidebar: null,
};

function SideBar(props) {
  const { showSidebar } = props;

  const toggleDrawer = (value) => {
    const { onToggleSidebar } = this.props;
    if (onToggleSidebar) {
      onToggleSidebar(value);
    }
  };

  return (
    <Drawer
      className="drawer-paper"
      variant="persistent"
      open={showSidebar}
      onClose={() => toggleDrawer(false)}
    ></Drawer>
  );
}

export default SideBar;
