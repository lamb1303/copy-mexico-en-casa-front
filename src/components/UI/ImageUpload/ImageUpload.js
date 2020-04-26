import React, { useRef, useState, useEffect } from 'react';
import Button from './Button';
import './ImageUpload.css';
import image from '../../../assets/default_Image.png'

const ImageUpload = props => {
    const filePickerRef = useRef();
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
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
        props.onInput(pickedFile, fileIsValid);
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
                <div className="image-upload__preview" >
                    {previewUrl && <img src={previewUrl} alt="Preview" />}
                    {!previewUrl && <img src={image}/>}
                </div>
                <Button type="button" onClick={pickImageHandler}>{props.text}</Button>

            </div>
        </div>
    );
};

export default ImageUpload;