import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'reactstrap';
import './PhotoCard.scss';

PhotoCard.propTypes = {
  photo: PropTypes.object,
  onEditClick: PropTypes.func,
  onRemoveClick: PropTypes.func,
};

PhotoCard.defaultProps = {
  photo: {},
  onEditClick: null,
  onRemoveClick: null,
};

function PhotoCard(props) {
  const { photo, onEditClick, onRemoveClick } = props;

  const handleEditCLick = () => {
    if (onEditClick) {
      onEditClick(photo);
    }
  };

  const handleRemoveCLick = () => {
    if (onRemoveClick) {
      onRemoveClick(photo);
    }
  };

  return (
    <div className="photo">
      <img src={photo.photo} alt={photo.title} />

      <div className="photo__overlay">
        <h3 className="photo__title">{photo.title}</h3>

        <div className="photo__actions">
          <div>
            <Button outline size="sm" color="light" onClick={handleEditCLick}>
              Edit
            </Button>
          </div>
          <div>
            <Button outline size="sm" color="danger" onClick={handleRemoveCLick}>
              Remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhotoCard;