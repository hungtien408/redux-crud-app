import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Header from './Header';
import SideBar from './SideBar';
import './styles.scss';

Dashboard.propTypes = {
  name: PropTypes.string,
  children: PropTypes.object.isRequired,
  showSidebar: PropTypes.bool,
};

Dashboard.defaultProps = {
  name: '',
  showSidebar: false,
};

function Dashboard(props) {
  const { name, children, showSidebar } = props;
  const { contentHeight } = useState(window.innerHeight);

  const handleToggleSidebar = (value) => {
    const { uiActionCreators } = this.props;
    const { showSidebar, hideSidebar } = uiActionCreators;
    if (value === true) {
      showSidebar();
    } else {
      hideSidebar();
    }
  };

  return (
    <div className="dashboard">
      <Header name={name} showSidebar={showSidebar} onToggleSidebar={handleToggleSidebar} />
      <div className="wrapper" style={{ height: `${contentHeight}px` }}>
        <SideBar showSidebar={showSidebar} onToggleSidebar={handleToggleSidebar} />
        <div
          className={cn('wrapper-content', {
            'shift-left': showSidebar === false,
          })}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
