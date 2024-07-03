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
            <BookSelector editMode={true} />
            <div className="row ">
                <div className="col-3">

                    <div className="card" >
                        <img src="/images/great_gatsby.png" className="card-img-top" alt="..." />

                        <div className="card-body">
                            <p className="card-text">The Great Gatsby</p>
                        </div>

                    </div>
                </div>
                <div className="col-2">

                    <div className="card" >
                        <img src="/images/alice_wonderland.png" className="card-img-top" alt="..." />

                        <div className="card-body">
                            <p className="card-text">Alice In Wonderland</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    );
}
