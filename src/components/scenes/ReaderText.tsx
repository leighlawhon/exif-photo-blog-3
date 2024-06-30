'use client';

import { ReactNode } from 'react';
import { clsx } from 'clsx/lite';
import FileUploaderAndReader from './fileuploader';

interface ReaderTextProps {
    editMode: boolean;
}

export default function ReaderText({ editMode }: ReaderTextProps) {
    return (
        <div id="text-container">

            <div className={clsx(
                'bg-white dark:bg-black',
                'dark:text-gray-400',
                'border border-gray-200 dark:border-gray-800 rounded-md',
                'divide-y divide-gray-200 dark:divide-gray-800',
            )}>
                <FileUploaderAndReader editMode={editMode} />
            </div>
        </div>
    );
}
