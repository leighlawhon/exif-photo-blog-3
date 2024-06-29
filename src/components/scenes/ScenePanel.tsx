import { ReactNode } from 'react';
import { clsx } from 'clsx/lite';

export default function ScenePanel() {
    return (
        <div>

            <div className={clsx(
                'bg-white dark:bg-black',
                'dark:text-gray-400',
                'border border-gray-200 dark:border-gray-800 rounded-md',
                'divide-y divide-gray-200 dark:divide-gray-800',
            )}>
                Image here
            </div>
        </div>
    );
}
