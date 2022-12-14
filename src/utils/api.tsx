import axios, { AxiosResponse } from "axios";
import { Album, Photo, User, PageOption } from "./typed";

const APIClient = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  responseType: "json",
});

function normalizeResponse<T>(response: AxiosResponse<T, any>) {
  if (response.status !== 200) {
    throw new Error(response.statusText);
  }
  return response.data;
}

async function getApi<T>(endpoint: string): Promise<T> {
  try {
    const resposne = await APIClient.get(endpoint);

    return normalizeResponse(resposne);
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    return Promise.reject();
  }
}

export async function getUsers() {
  const response = await getApi<Array<User>>("users");
  return response.map((c) => {
    return {
      ...c,
      color: randomColor(),
    };
  });
}

export async function getAlbums(skip: number = 0, take: number = 20) {
  return await getApi<Array<Album>>(
    `albums?_start=${skip * take}&_limit=${take}`
  );
}
export async function getAlbum(id: number) {
  return await getApi<Album>(`albums/${id}`);
}
export async function getPhotos(
  albumId: number,
  skip: number = 0,
  take: number = 20
) {
  return await getApi<Array<Photo>>(
    `photos?albumId=${albumId}&_start=${skip * take}&_limit=${take}`
  );
}

export const defaultPageOption: PageOption = {
  size: 20,
  page: 0,
};

export const randomColor = () =>
  Math.floor(Math.random() * 16777215).toString(16);
