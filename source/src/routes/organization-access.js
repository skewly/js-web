import React from 'react';

const Route = (props) => {
    const { organization } = props;
    
    return (
        <h4>ACCESS: Organization: {organization?.name}</h4>
    );
}

export default Route;