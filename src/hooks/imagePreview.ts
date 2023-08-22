import { useCallback, useState } from "react";

const useImageFileListWithPreview = (abc: []) => {
  const [imagePreviewSources, setImagePreviewSources] = useState<string[]>([]);
  const [imageFileList, setImageFileList] = useState<File[]>([]);

  const onLoadFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target?.files || new FileList();

    const fileListArray = Array.from(fileList);

    const filteredImageFiles = fileListArray.filter(
      (f) => f.type.match("image.*") && f.size < 10000000
    );

    const urlList = filteredImageFiles.map((f) => {
      return URL.createObjectURL(f);
    });

    setImageFileList(filteredImageFiles);
    setImagePreviewSources(urlList);
  }, []);

  return { onLoadFile, imagePreviewSources, imageFileList };
};

export default useImageFileListWithPreview;
