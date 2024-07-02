import { Photo } from '@/photo';
import React, { useState } from 'react';


interface PhotoToggleProps {
    photos: Photo[];
    onFilter: (tag: string) => void;
}

const PhotoToggle = ({ photos, onFilter }: PhotoToggleProps) => {
    const [selected, setSelected] = useState('All');

    const handleFilter = (tag: string) => {
        setSelected(tag);
        onFilter(tag);
        // Set CSS
    };

    return (
        <div className="toggle-button-bar">
            <button
                className={`toggle-button ${selected === 'All' ? 'active' : ''}`}
                onClick={() => handleFilter('All')}
            >
                View Panel
            </button>
            {photos.map((photo) => (
                <button
                    key={photo.id}
                    className={`toggle-button ${selected === photo.id ? 'active' : ''}`}
                    onClick={() => handleFilter(photo.id)}
                >
                    {photo.title || 'Photo'}
                </button>
            ))}
        </div>
    );
};

export default PhotoToggle;