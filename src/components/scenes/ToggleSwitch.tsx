import clsx from 'clsx';
import React, { ReactNode, useState } from 'react';

interface ToggleSwitchProps {
    children: ReactNode;
    isVisible: boolean;
    onToggle: (isVisible: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ children, isVisible, onToggle }) => {
    const [toggleChecked, setToggleChecked] = useState(false);

    const toggleVisibility = () => {
        onToggle(!isVisible);
        setToggleChecked(!toggleChecked);
    };

    return (
        <div>
            <button onClick={toggleVisibility}>
                {isVisible ? 'Hide Elements' : 'Show Elements'}
            </button>
            <label className="toggle-switch">
                <input type="checkbox" checked={toggleChecked} onChange={toggleVisibility} />
                <span className="slider"></span>
            </label>
            <div className={clsx('grid gap-0.5 sm:gap-1 grid-cols-2 xs:grid-cols-2 items-center')}>
                {isVisible && children}
            </div>
        </div>
    );
};

export default ToggleSwitch;