import { useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { set } from 'react-hook-form';
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
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isClick, setIsClick] = useState(false);

    const setRouteParent = (parent, folder) => {
        if (parent === 0) {
            return `/class/${folder}`;
        }
        if (parent > 0) {
            return `${params}/${folder}`;
        }
        if (parent === undefined && folder === undefined && isCourse === true) {
            return false;
        }
    };

    const handleJoinCourse = (data) => {
        const link = setRouteParent(props?.parent_tree_id, props?.folder_tree_id);
        if (link || !isCourse) {
            navigate(link);
        } else {
            onOpen();
            console.log('click' + isClick);
            // if (isClick) {
            //     console.log(isClick);
            //     dispatch(joinCourse(data.id, user.msg));
            // } else {
            // }
        }
    };

    useEffect(() => {
        getData();
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
        <div>
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
            <PopOver
                courseName={props?.subject_id?.name + '-' + props?.teacher_id?.name}
                courseDetail={props?.class_id?.name}
                isOpen={isOpen}
                onClose={onClose}
                courseID={props?.id}
                setIsClick={setIsClick}
            />
        </div>
    );
};

export default ClassItem;
