import { GHIBLI_API_BASE_URL } from "@/constants";

/**
 * get id from a ghibli resource url
 * e.g. https://ghibliapi.vercel.app/people/598f7048-74ff-41e0-92ef-87dc1ad980a9 => 598f7048-74ff-41e0-92ef-87dc1ad980a9
 * e.g. https://ghibliapi.vercel.app/locations/ => ''
 */
export const getCategoryId = (url: string = GHIBLI_API_BASE_URL) => {
  const segments = new URL(url).pathname.split("/");
  const id = segments?.[2] ?? "";
  return id;
};
