import { Link } from '@chakra-ui/react';
import React from 'react';

const ClassItem = ({ props }) => {
    const setRouteParent = (parent, folder, id) => {
        // console.log(parent, folder, id);
        if (parent === 0) {
            return `../class/${folder}`;
        } else if (parent > 0) {
            return `${parent}/${folder}`;
        }
        if (parent === undefined && folder === undefined) {
            return `/course/${id}`;
        }
    };

    return (
        <div>
            <Link
                href={setRouteParent(props?.parent_tree_id, props?.folder_tree_id, props?.id)}
                className="class__item"
            >
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
            </Link>
        </div>
    );
};

export default ClassItem;
