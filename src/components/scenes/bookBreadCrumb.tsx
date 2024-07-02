
import { PATH_BOOK_DYNAMIC } from '@/site/paths';
import { ReactNode } from 'react';
import { clsx } from 'clsx/lite';
import { Book } from '@/books/types';
import Link from 'next/link';

interface BookBreadCrumbProps {
    booktitle: String;
    scenetitle: String;
    chaptertitle: String;
}




const ToggleSwitch: React.FC<BookBreadCrumbProps> = ({ booktitle, chaptertitle, scenetitle }) => {


    return (
        <div>
            {booktitle} {">"}{chaptertitle} {">"}  {scenetitle}
        </div>
    );
};

export default ToggleSwitch;
