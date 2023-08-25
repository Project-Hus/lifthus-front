import { useCallback, useState } from "react";

/**
 * Provides onLoadFile callback to handle the image file input,
 * and imagePreviewSources for showing the uploaded images' preview.
 * imageFileList is the list of the uploaded image files which the types are File.
 * removeImages is a callback to remove the images with given indexes.
 *
 * @returns { onLoadFile: (e: React.ChangeEvent<HTMLInputElement>) => void, imagePreviewSources: string[], imageFileList: File[], removeImages: (idxs: number[]) => void}
 */
export const useImageFileListWithPreview = () => {
  const [imagePreviewSources, setImagePreviewSources] = useState<string[]>([]);
  const [imageFileList, setImageFileList] = useState<File[]>([]);

  const onLoadFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const fileList = e.target?.files || new FileList();

      if (!fileList.length || fileList.length + imageFileList.length > 5)
        return alert("Maximum 5 images are allowd T.T");

      const fileListArray = Array.from(fileList);

      const filteredImageFiles = fileListArray.filter(
        (f) => f.type.match("image.*") && f.size < 10000000
      );

      const urlList = filteredImageFiles.map((f) => {
        return URL.createObjectURL(f);
      });

      setImageFileList((prev) => [...prev, ...filteredImageFiles]);
      setImagePreviewSources((prev) => [...prev, ...urlList]);
    },
    [imageFileList, imagePreviewSources]
  );

  const removeImages = useCallback(
    (idxs: number[]) => {
      setImagePreviewSources((prev) => [
        ...prev.filter((_, i) => !idxs.includes(i)),
      ]);
      setImageFileList((prev) => [...prev.filter((_, i) => !idxs.includes(i))]);
    },
    [imageFileList, imagePreviewSources]
  );

  return { onLoadFile, imagePreviewSources, imageFileList, removeImages };
};
