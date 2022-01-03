import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Banner from '../../../../components/Banner';
import { randomNumber } from '../../../../utils/common';
import PhotoForm from '../../components/PhotoForm';
import { addPhoto, updatePhoto } from '../../photoSlice';
import './style.scss';

AddEditPage.propTypes = {};

function AddEditPage(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { photoId } = useParams();
  const isAddMode = !photoId;

  const editedPhoto = useSelector((state) => state.photos.find((x) => x.id === parseInt(photoId)));

  const initialValues = isAddMode
    ? {
        title: '',
        categoryId: null,
        photo: '',
      }
    : editedPhoto;

  const handleSubmit = (values) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newPhoto = {
          ...values,
          id: randomNumber(10000, 99999),
        };
        const action = isAddMode ? addPhoto(newPhoto) : updatePhoto(values);
        dispatch(action);

        history.push('/photos');
        resolve(true);
      }, 2000);
    });
  };

  return (
    <div className="photo-edit">
      <Banner title="Pick your amazing photo" />

      <div className="photo-edit__form">
        <PhotoForm isAddMode={isAddMode} initialValues={initialValues} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default AddEditPage;