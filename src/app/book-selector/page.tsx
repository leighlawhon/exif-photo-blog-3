import { PATH_BOOK_SELECTOR } from '@/site/paths';
import BookSelector from '@/components/scenes/BookSelector';
import JsonFileUploader from '@/components/scenes/JsonFileUploader';

export const dynamic = 'force-static';


const cacheKey = "page-" + PATH_BOOK_SELECTOR;

export default async function BookSelectorPage() {

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h3 className="text-start p-3">Available Books</h3>
                </div>
            </div>
            <JsonFileUploader editMode={true} mode="create" />
            <JsonFileUploader editMode={true} mode="delete" />

            <BookSelector editMode={true} />
        </div>

    );
}
