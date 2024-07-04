import clsx from 'clsx';
import React, { ReactNode, useState } from 'react';

interface ToggleSwitchProps {
    children: ReactNode;
    isVisible: boolean;
    onToggle: (isVisible: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ children, isVisible, onToggle }) => {
    const [toggleChecked, setToggleChecked] = useState(true);

    const toggleVisibility = () => {
        onToggle(!isVisible);
        setToggleChecked(!toggleChecked);
    };

    return (
        <div>
            <span>Edit Mode</span>
            <label className="toggle-switch">
                <input type="checkbox" checked={toggleChecked} onChange={toggleVisibility} />
                <span className="slider"></span>
            </label>
            <div className={'toggle-container'}>
                {isVisible && children}
            </div>
        </div>
    );
};

export default ToggleSwitch;