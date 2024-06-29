
import { PATH_READER } from '@/site/paths';


const cacheKey = "page-" + PATH_READER;

export default async function ReaderPage({
    cacheKey,

}: {
    cacheKey: string
}) {

    return (
        <div className="flex flex-col items-center w-full">Hello </div>
    );
}
