import dotenv from "dotenv";

dotenv.config();

export const searchFunc = async (
  query: string,
  searchType: string,
  page: number
): Promise<any> => {
  const q = encodeURIComponent(query);
  const type = encodeURIComponent(searchType);
  const offset = encodeURIComponent((page - 1) * 20);
  const querystring = `q=${q}&type=${type}&offset=${offset}`;

  try {
    const response = await fetch(`/api/search?${querystring}`, {
      method: "GET",
    });

    const data = await response.json();

    if (response.status !== 200) throw new Error();
    const results = data[`${searchType}s`];
    return Promise.resolve(results);
  } catch (error) {
    return Promise.reject(new Error("cannot search"));
  }
};

export const fetchDataFunc = async (
  type: "myPlaylist" | "artists" | "artists_albums" | "artists_top_tracks",
  id: string
): Promise<any> => {
  let uri = "";

  switch (type) {
    case "myPlaylist":
      uri = `/api/myPlaylist/${id}`;
      break;
    case "artists":
      uri = `/api/artists/info/${id}`;
      break;
    case "artists_albums":
      uri = `/api/artists/albums/${id}`;
      break;
    case "artists_top_tracks":
      uri = `/api/artists/top_tracks/${id}`;
      break;
    default:
      break;
  }

  if (uri !== "") {
    try {
      const response = await fetch(uri, {
        method: "GET",
      });

      const data = await response.json();

      if (response.status !== 200) throw new Error();
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(new Error("cannot get the data"));
    }
  }
};
