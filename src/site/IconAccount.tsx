/* eslint-disable max-len */

const INTRINSIC_WIDTH = 28;
const INTRINSIC_HEIGHT = 24;

export default function IconAccount({
    width = INTRINSIC_WIDTH,
    includeTitle = true,
}: {
    width?: number;
    includeTitle?: boolean;
}) {
    return (

        <svg
            width={width}
            height={(INTRINSIC_HEIGHT * width) / INTRINSIC_WIDTH}
            viewBox="1 0 28 24"
            fill="currentColor"
            stroke="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {includeTitle && <title>Account ⌘K</title>}
            <path d="M40.5,44.5c-3.1-7-8.4-11.3-16.1-11.7-8.6-.4-14.5,4-18,11.7C-2.5,35-2,20.2,7.5,11.4c9.4-8.8,24.2-8.3,33,1.2,8.4,9,8.3,22.9,0,31.9M23.4,12.3c-5,0-9.1,4-9.1,9.1,0,5,4,9.1,9.1,9.1s9.1-4,9.1-9.1c0,0,0,0,0,0,0-5-4.1-9-9.1-9" />
        </svg>

    );
}
