
import { PATH_BOOK_DYNAMIC } from '@/site/paths';
import { ReactNode } from 'react';
import { clsx } from 'clsx/lite';
import { Book } from '@/books/types';
import Link from 'next/link';

import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import { Url } from 'next/dist/shared/lib/router/router';

interface BookBreadCrumbProps {
    booktitle: String;
    scenetitle: String;
    chaptertitle: String;
    curentURL: string;
    resetChapter: () => void;
}


// const bookID = useSearchParams().get('bookID');


const ToggleSwitch: React.FC<BookBreadCrumbProps> = ({ booktitle, chaptertitle, scenetitle, curentURL, resetChapter }) => {


    return (
        <div>
            <a href={curentURL}> {booktitle} </a>{">"}<a onClick={resetChapter}>{chaptertitle} </a>{">"}  {scenetitle}
        </div>
    );
};

export default ToggleSwitch;
