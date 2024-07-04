import { Photo } from '@/photo';
import Panel from './Panel';
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
    currentPanel
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
        currentPanel: number;
}) {
    return (
        <div>
            <div>
                {editMode &&
                    book?.chapters[currentChapter].chapter.scenes[currentScene].panels.map((panel, i) =>
                        <div className={"panel-" + i}>
                            {panel.characters.map((character: string) => (
                                <span className="phototag">{character}</span>
                            ))}
                        </div>
                    )
                }
            </div>
            <div className="panel-container">
                <div>
                    {editMode &&
                        book?.chapters[currentChapter].chapter.scenes[currentScene].panels.map((panel, i) =>
                            <div key={"panel-" + i} className={"panel-" + i + ", panel-border"}>
                                {
                                    photos.map((photo, index) => (
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
                                            key={photo.id}
                                        />
                                    )).concat(additionalTile ?? [])
                                }
                            </div>
                        )
                    }
                </div>

            </div>
        </div>
    );
};
