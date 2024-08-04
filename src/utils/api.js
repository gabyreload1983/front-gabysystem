import { getJWT } from "../utils";
import { SwalError } from "./alerts";
import { validateResponse } from "./validation";

export const getFromApi = async (path) => {
  try {
    const response = await fetch(path, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getJWT()}`,
      },
    });
    if (!response) return;

    if (await validateResponse(response)) return await response.json();
  } catch (error) {
    return SwalError(error?.message);
  }
};

export const putToApi = async (path, body) => {
  try {
    const response = await fetch(path, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getJWT()}`,
      },
    });
    if (await validateResponse(response)) return await response.json();
  } catch (error) {
    return SwalError(error?.message);
  }
};

export const patchToApi = async (path, body) => {
  try {
    const response = await fetch(path, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getJWT()}`,
      },
    });
    if (await validateResponse(response)) return await response.json();
  } catch (error) {
    return SwalError(error?.message);
  }
};

export const postToApi = async (path, body) => {
  try {
    const response = await fetch(path, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getJWT()}`,
      },
    });
    if (await validateResponse(response)) return await response.json();
  } catch (error) {
    return SwalError(error?.message);
  }
};

export const deleteToApi = async (path) => {
  try {
    const response = await fetch(path, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getJWT()}`,
      },
    });
    if (await validateResponse(response)) return await response.json();
  } catch (error) {
    return SwalError(error?.message);
  }
};
