import { INFINITE_SCROLL_GRID_PHOTO_INITIAL, Photo } from '@/photo';
import Panel from './Panel';
import { Camera } from '@/camera';
import { FilmSimulation } from '@/simulation';
import { Book } from '@/books/types';
import PhotoToggle from './PhotToggle';
import { cache, useState } from 'react';
import { getPhotos } from '@/photo/db/query';

export default function PanelLayout({
    editMode,
    photos,
    selectedPhoto,
    tag,
    camera,
    simulation,
    focal,
    photoPriority,
    additionalTile,
    book,
    onLastPhotoVisible,
    currentScene,
    currentChapter,
}: {
        editMode: boolean;
        photos: Photo[];
        selectedPhoto?: Photo;
        tag?: string;
        camera?: Camera;
        simulation?: FilmSimulation;
        focal?: number;
        photoPriority?: boolean;
        additionalTile?: JSX.Element;
        book?: Book;
        onLastPhotoVisible?: () => void;
        currentScene: number;
        currentChapter: number;
}) {
    const [filteredPhotos, setFilteredPhotos] = useState(photos);
    const [panelTogglePhotos, setPanelToggledPhotos] = useState(photos);


    const handleFilter = (tag: string) => {
        if (tag === 'All') {
            setFilteredPhotos(photos);
        } else {
            console.log(tag, "tag");
            setFilteredPhotos(photos.filter(photo => {
                console.log()
                photo.tags.includes(tag)
            }));
        }
    };


    // setPanelToggledPhotos(panelPhotos.filter(photo => filteredPhotos.includes(photo)))
    return (
        <div>
            <div className="panel-container">
                <div>
                    {book?.chapters[currentChapter].chapter.scenes[currentScene].panels.map((panel, i) => {
                        const sceneTag = `panel-${currentChapter}-${currentScene}-${i}`;
                        const panelPhotos = filteredPhotos.filter(photo => photo.tags.includes(sceneTag));

                        return (
                            <div key={"panel-layout-" + i}>
                                {editMode && (
                                    <div className={"panel-tags-" + i}>
                                        <PhotoToggle characters={panel.characters} onFilter={handleFilter} />
                                    </div>
                                )}
                                <div id={sceneTag} key={"panel-" + i} className={"panel-" + i + ", panel-border"}>
                                    <p>{sceneTag}</p>
                                    {
                                        panelPhotos.map((photo, index) => (
                                        <Panel
                                            {...{
                                                editMode,
                                                photo,
                                                photoTitle: photo.title ?? '',
                                                tag,
                                                camera,
                                                simulation,
                                                focal,
                                                selected: photo.id === selectedPhoto?.id,
                                                priority: photoPriority,
                                                onVisible: index === photos.length - 1 ? onLastPhotoVisible : undefined,
                                            }}
                                            className="flex w-full h-full"
                                                key={"something" + photo.id}
                                        />
                                    )).concat(additionalTile ?? [])}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
