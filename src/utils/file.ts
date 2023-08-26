import axios from "axios";
import { Blob } from "buffer";

/**
 * downloads and return any file from a url as a blob.
 *
 * @param url
 * @returns {Promise<Blob>}
 */
export const downloadBlob = async (url: string): Promise<Blob> => {
  const response = await axios.get(url, { responseType: "blob" });
  return response.data;
};

/**
 * takes a blob and returns a file with the given fileName and mimeType.
 *
 * @param blob
 * @param fileName
 * @param mimeType
 * @returns {Promise<File>}
 */
export const createFileFromBlob = async (
  blob: any,
  fileName: any,
  mimeType: any
): Promise<File> => {
  const file = new File([blob], fileName, { type: mimeType });
  return file;
};

/**
 * takses a file src list and returns them as a file list.
 *
 * @param imageUrls
 * @returns {Promise<File[]>}
 */
export const fetchFilesAndCreateFileList = async (
  fileSrcs: string[]
): Promise<File[]> => {
  const files: File[] = [];
  for (const src of fileSrcs) {
    try {
      const blob = await downloadBlob(src);
      const fileName = src.split("/").pop(); // Get the filename from the URL
      const mimeType = blob.type;
      const file = await createFileFromBlob(blob, fileName, mimeType);
      files.push(file);
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  return files;
};
