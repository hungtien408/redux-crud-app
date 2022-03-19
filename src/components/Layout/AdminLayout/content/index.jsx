import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Header from './../header';
import SideBar from './../side-bar';
import './styles.scss';

Content.propTypes = {
  name: PropTypes.string,
  children: PropTypes.object.isRequired,
  showSidebar: PropTypes.bool,
};

Content.defaultProps = {
  name: '',
  showSidebar: false,
};

function Content(props) {
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
    <div className="content-layout">
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

export default Content;
