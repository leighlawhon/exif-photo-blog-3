import Image from 'next/image';
import React, { useState, useCallback } from 'react';

const PageNav: React.FC<{ children: React.ReactNode, forwardNav: () => void, backNav: () => void }> = ({ children, forwardNav, backNav }) => {


    return (
        <div>
            <button onClick={backNav}>Back</button>
            <button onClick={forwardNav}>Forward</button>
            {children}
        </div>
    );
};

export default PageNav;

