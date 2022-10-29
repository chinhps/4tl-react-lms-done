import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ClassItem from '../../Components/Core/ClassItem';
import { fetchClasses } from '../../reducer/classesSlide';
import { classesSelector } from '../../selectors';

const Classes = () => {
    let params = useParams();
    params = Object.values(params);
    params = params.toString();
    const listClasses = useSelector(classesSelector);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchClasses(params));
    }, [dispatch, params]);

    return (
        <div className="class">
            {listClasses.map((item, index) => (
                <ClassItem props={item} key={index} isCourse={true} />
            ))}
        </div>
    );
};

export default Classes;
