import React from 'react';
import DropZone from './DropZone';

const Upload = () => {
    const onFileChange = (files) => {
        console.log(files);
    }

    return (
        <div className='dropzone'>
            <div className="dropzone__box">
                <h2 className="dropzone__box__header">
                    React drop files input
                </h2>
                <DropZone
                    onFileChange={(files) => onFileChange(files)}
                />
            </div>
        </div>
    );
};

export default Upload;
