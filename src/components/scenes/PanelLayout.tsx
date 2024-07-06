import { useState, useEffect } from 'react';
import { Photo } from '@/photo';
import ScenePanel from './ScenePanel';
import PhotoFilterSet from './PhotoFilterSet';
import { Camera } from '@/camera';
import { FilmSimulation } from '@/simulation';
import { Book } from '@/books/types';

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
    const [panelTagPhotos, setPanelTagPhotos] = useState<Photo[]>(photos);
    const [sceneTag, setSceneTag] = useState<string>("");


    useEffect(() => {
        // Initially filter photos when component mounts or when `photos` or `tag` changes
        // const initialFilter = tag === 'All' ? photos : photos.filter(photo => photo.tags.includes(tag ?? ''));
        // setFilteredPhotos(initialFilter);
    }, [photos, tag]);

    const setPanelPhotosFilter = (newTag: string) => {
        // Filter photos by newTag and update state
        // const filtered = photos.filter(photo => photo.tags.includes(newTag));
        // setFilteredPhotos(filtered);
        // setPanelTagPhotos(newTag); // Update the current filter tag
    };
    const handlePanelPhotosFilter = (newTag: string) => {
        const scenePhotos = photos.filter(photo => photo.tags.includes(newTag));
        setSceneTag(newTag);
        console.log(newTag)
        setPanelTagPhotos(scenePhotos)
    }   


    return (
        <div>
            {/* <PhotoFilterSet photos={photos} tag={tag ?? 'All'} onFilterChange={setFilteredPhotos} setPanelPhotosFilter={setPanelPhotosFilter} /> */}
            <div className="panel-container">
                {book?.chapters[currentChapter].chapter.scenes[currentScene].panels.map((panel, i) => {
                    return (
                    <ScenePanel
                            photos={photos}
                        panel={panel}
                        currentChapter={currentChapter}
                        currentScene={currentScene}
                            editMode={editMode}
                        key={"scene-panel-" + i}
                            index={i}
                            handlePanelPhotosFilter={handlePanelPhotosFilter}
                    />
                    )
                })}
            </div>
        </div>
    );
}