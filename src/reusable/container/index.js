import React from 'react';

const BodyContainer = ({children}) => {
    return (
        <div
            style={{
                margin: '20px 0px',
                padding: '20px',
                borderRadius: '10px',
                width: '100%',
                background: 'white'
            }}
        >
            {children}
        </div>
    );
};

export default BodyContainer;
