import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import uploadImg from '../../assets/images/upload/cloud-upload-regular-240.png'
import { imageConfig } from '../../utils/constants'

const DropZone = ({ props }) => {
    const wrapperRef = useRef(null);

    const [fileList, setFileList] = useState([]);

    const handleDragEnter = () => wrapperRef.current.classList.add('dragover');

    const handleDragLeave = () => wrapperRef.current.classList.remove('dragover');

    const handleDrop = () => wrapperRef.current.classList.remove('dragover');

    const onFileDrop = (e) => {
        const newFile = e.target.files[0];
        if (newFile) {
            const updatedList = [...fileList, newFile];
            setFileList(updatedList);
            props.onFileChange(updatedList);
        }
    }

    const fileRemove = (file) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
        props.onFileChange(updatedList);
    }

    return (
        <>
            <div
                ref={wrapperRef}
                className="dropfile-input"
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <div className="dropfile-input__label">
                    <img src={uploadImg} alt="" />
                    <p>Drag & Drop your files here</p>
                </div>
                <input type="file" value="" onChange={onFileDrop}/>
            </div>
            {
                fileList.length > 0 ? (
                    <div className="dropfile-preview">
                        <p className="dropfile-preview__title">
                            Ready to upload
                        </p>
                        {
                            fileList.map((item, index) => (
                                <div key={index} className="dropfile-preview__item">
                                    <img src={imageConfig[item.type.split('/')[1]] || imageConfig['default']} alt="" />
                                    <div className="dropfile-preview__item__info">
                                        <p>{item.name}</p>
                                        <p>{item.size}B</p>
                                    </div>
                                    <span className="dropfile-preview__item__del" onClick={() => fileRemove(item)}>x</span>
                                </div>
                            ))
                        }
                    </div>
                ) : null
            }
        </>
    )
}

DropZone.propTypes = {
    onFileChange: PropTypes.func
}

export default DropZone