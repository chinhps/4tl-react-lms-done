import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { joinCourse } from '../../reducer/courseStudentSlide';
import { courseStudentSelector, userSelector } from '../../selectors';

import PopOver from './PopOver';

const ClassItem = ({ props, isCourse }) => {
    const dispatch = useDispatch();
    let params = useParams();
    const navigate = useNavigate();
    params = Object.values(params).toString();
    const courseStudent = useSelector(courseStudentSelector);
    const user = useSelector(userSelector);

    const setRouteParent = (parent, folder) => {
        console.log(parent, folder);
        if (Number(parent) === 0) {
            return `/class/${folder}`;
        }
        if (Number(parent) > 0) {
            return `${params}/${folder}`;
        }
        if (parent === undefined && folder === undefined && isCourse === true) {
            return false;
        }
    };
    const handleJoinCourse = (data) => {
        const link = setRouteParent(data?.parent_tree_id, data.folder_tree_id);
        if (link && !isCourse) {
            navigate(link);
        } else {
            dispatch(joinCourse(data.id, user.msg));
            navigate(`/course/${data.id}`);
        }
    };

    useEffect(() => {
        if (courseStudent.id === props.id) getData();
    }, [courseStudent.courseStudent]);

    const getData = () => {
        if (!courseStudent.pending || props.isCourse) {
            if (courseStudent.courseStudent.status === 200) {
                console.log('da tham gia', courseStudent);
            } else {
                console.log('tham gia that bai', courseStudent);
            }
        }
    };

    return (
        <>
            <div className="class__item" onClick={() => handleJoinCourse(props)}>
                <div className="class__icon">
                    <i className="fa-solid fa-book"></i>
                </div>
                <div className="class__detail">
                    {props.subject_id ? (
                        <h3 className="class__detail--title">
                            {props?.subject_id?.name + '-' + props?.teacher_id?.name}
                        </h3>
                    ) : (
                        <h3 className="class__detail--title">{props?.name}</h3>
                    )}
                    {props.class_id ? (
                        <p className="class__detail--sup">{props?.class_id?.name}</p>
                    ) : (
                        <p className="class__detail--sup">{props?.name}</p>
                    )}
                    {props.term ? (
                        <p className="class__detail--time">{props?.created_at}</p>
                    ) : (
                        <p className="class__detail--time">{props?.term}</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default ClassItem;
