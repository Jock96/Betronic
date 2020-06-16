import React from 'react';
import { Link } from 'react-router-dom';
import Constants from '../../Constants.json';

const LinksForm = ({ node, removeRoute }) => {
    return (
        <div className="func-block-child">
            <h2 className="block-info">{Constants.links}</h2>
            {
                node.nodes.map((childNode) => (
                    <div key={childNode.route}>
                        <Link to={childNode.route}>{childNode.route}</Link>
                        <button className='button-v1' onClick={() => removeRoute(childNode.route)}>{Constants.remove}</button>
                    </div>
                ))
            }
        </div>
    );
};

export default LinksForm;