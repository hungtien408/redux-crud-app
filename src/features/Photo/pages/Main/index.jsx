import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Container } from 'reactstrap';
import Banner from '../../../../components/Banner';
import { Images } from '../../../../constants/images';
import PhotoList from '../../components/PhotoList';
import { removePhoto } from '../../photoSlice';

function MainPage(props) {
  const dispatch = useDispatch();
  const photos = useSelector((state) => state.photos);
  const history = useHistory();

  const handleEditPhoto = (photo) => {
    const editPhotoUrl = `/photos/${photo.id}`;
    history.push(editPhotoUrl);
  };

  const handleRemovePhoto = (photo) => {
    const action = removePhoto(photo.id);
    dispatch(action);
  };

  return (
    <div className="photo-main">
      <Banner title="Your awesome photos" backgroundUrl={Images.PINK_BG} />

      <Container className="text-center">
        <Link to="/photos/add">Add new photo</Link>
      </Container>

      <Container>
        <PhotoList
          photoList={photos}
          onPhotoEditClick={handleEditPhoto}
          onPhotoRemoveClick={handleRemovePhoto}
        />
      </Container>
    </div>
  );
}

export default MainPage;
