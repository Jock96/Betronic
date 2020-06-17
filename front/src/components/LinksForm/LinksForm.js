import React from 'react';
import { Link } from 'react-router-dom';
import Constants from '../../Constants.json';
import clsx from 'clsx';

const LinksForm = ({ node, isVk, isWa, isGl }) => {
    return (
        <div className="func-block-child">
            <h2 className={clsx({'block-info-vk': isVk, 'block-info-wa': isWa, 'block-info-gl': isGl})}>{Constants.links}</h2>
            {
                node.nodes.map((childNode) => (
                    <div key={childNode.route}>
                        <Link to={childNode.route}>{childNode.route}</Link>
                    </div>
                ))
            }
        </div>
    );
};

export default LinksForm;