import { Photo } from "@/photo";
import { useEffect, useCallback } from "react";

export default function PhotoFilterSet({
  photos,
  tag,
  onFilterChange,
  setPanelPhotosFilter
}: {
  photos: Photo[],
  tag: string,
  onFilterChange: (filtered: Photo[]) => void,
  setPanelPhotosFilter: (filter: string) => void
}) {
  // Memoize the callback to ensure it doesn't change if not necessary
  const memoizedOnFilterChange = useCallback(onFilterChange, []);
  const memoizedSetPanelPhotosFilter = useCallback(setPanelPhotosFilter, []);

  useEffect(() => {
    const filtered = tag && tag !== 'All' ? photos.filter(photo => photo.tags.includes(tag)) : photos;
    memoizedOnFilterChange(filtered);
    memoizedSetPanelPhotosFilter(tag);
  }, [tag, photos]); // Removed memoizedOnFilterChange and memoizedSetPanelPhotosFilter from dependencies

  return null;
}