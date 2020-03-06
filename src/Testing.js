import React from "react";

export const Testing = () => {

    const working = () => {
        console.log('working');
    }

    return (
        <button onClick={working}>
            Button!
        </button>
    );
}

export default Testing;