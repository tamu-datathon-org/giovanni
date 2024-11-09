import React from 'react';
import PropTypes from 'prop-types';

const BulletPoint: React.FC<{ text: string }> = ({ text }) => {
    return (
        <li className='list-disc mb-1'>
            {text}
        </li>
    );
};

BulletPoint.propTypes = {
    text: PropTypes.string.isRequired,
};

const CustomBulletPoints: React.FC<{ items: string[] }> = ({ items }) => {
    return (
        <ul className='mt-4' style={{ paddingLeft: '20px' }}>
            {items.map((item, index) => (
                <BulletPoint key={index} text={item} />
            ))}
        </ul>
    );
};

CustomBulletPoints.propTypes = {
    items: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default CustomBulletPoints;
