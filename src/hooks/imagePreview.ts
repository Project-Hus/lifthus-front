import { useCallback, useState } from "react";

const useImageFileListWithPreview = () => {
  const [imagePreviewSources, setImagePreviewSources] = useState<string[]>([]);
  const [imageFileList, setImageFileList] = useState<File[]>([]);

  const onLoadFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target?.files || new FileList();

    if (!fileList.length || fileList.length + imageFileList.length > 5) return;

    const fileListArray = Array.from(fileList);

    const filteredImageFiles = fileListArray.filter(
      (f) => f.type.match("image.*") && f.size < 10000000
    );

    const urlList = filteredImageFiles.map((f) => {
      return URL.createObjectURL(f);
    });

    setImageFileList((prev) => [...prev, ...filteredImageFiles]);
    setImagePreviewSources((prev) => [...prev, ...urlList]);
  }, []);

  const removeImages = useCallback((idxs: number[]) => {
    setImagePreviewSources((prev) => prev.filter((_, i) => !idxs.includes(i)));
    setImageFileList((prev) => prev.filter((_, i) => !idxs.includes(i)));
  }, []);

  return { onLoadFile, imagePreviewSources, imageFileList, removeImages };
};

export default useImageFileListWithPreview;
