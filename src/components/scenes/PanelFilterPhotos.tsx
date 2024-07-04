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