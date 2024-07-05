import { Photo } from "@/photo";
import Panel from "./Panel";
type PanelProps = {
    editMode: boolean;
    photo: Photo;


};


export default function PhotoPanel({ editMode, photo }: PanelProps) {
    // Render logic for individual photo panels
    return (
        <Panel
            editMode={editMode}
            photo={photo}
            photoTitle={photo.title ?? ''}
            className="flex w-full h-full"
            key={"something" + photo.id}
        />
    );

}
