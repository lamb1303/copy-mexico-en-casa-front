import React, { useRef, useState, useEffect } from 'react';
import './ImageUpload.css';
import Button from '../Button/Button';

const ImageUpload = props => {
    const filePickerRef = useRef();
    const [file, setFile] = useState();
    const { img, updateForm } = props
    const [previewUrl, setPreviewUrl] = useState(img);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if (!file) {
            return;
        };

        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    }, [file]);

    useEffect(() => {
        if (updateForm) {
            setPreviewUrl(img);
        }
    }, [img, updateForm]);

    const pickedHandler = event => {
        let pickedFile;
        let fileIsValid = isValid;
        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        } else {
            setIsValid(false);
            fileIsValid = false;
        };
        props.onInput(props.id, pickedFile, fileIsValid);
    };

    const pickImageHandler = () => {
        filePickerRef.current.click();
    };

    return (
        <div className="form-control">
            <input
                type='file'
                ref={filePickerRef}
                id={props.id}
                style={{ display: 'none' }}
                accept='.jpg,.png,jpeg'
                onChange={pickedHandler}
            />
            <div className={`image-upload ${props.center && "center"}`} >
                <div className={`image-upload__preview ${props.from}`} >
                    {previewUrl && <img src={previewUrl} alt="Preview" />}
                    {!previewUrl && <p>Selecciona una imagen</p>}
                </div>
                <Button btnType={props.btnType} clicked={pickImageHandler}>{props.message}</Button>
            </div>
            {!isValid && <p>{props.errorText}</p>}
        </div>
    );
};

export default ImageUpload;