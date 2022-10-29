import React, { useState } from 'react';

const Upload = () => {
    const [selectedFile, setSelectedFile] = useState();

    return (
        <div className='upload'>
            <input type='file' name='file' className='upload__file' />

            <i class="fa fa-times"></i>

            <div className='upload__button'>
                <button className='upload__submit reset'>Reset</button>
                <button className='upload__submit upload'>Upload</button>
            </div>
        </div>
    )
}

export default Upload