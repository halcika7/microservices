type Dictionary = Record<string, unknown>;

/**
 * Transform received multipart data
 * @param  {T} data
 * @returns {T}
 */
export const transformMultipartData = <T extends Dictionary>(data: T) => {
  const objectCopy = { ...data };

  Object.entries(objectCopy).forEach(([key, value]) => {
    try {
      objectCopy[key as keyof T] = JSON.parse(value as string);
    } catch (error) {
      objectCopy[key as keyof T] = JSON.parse(JSON.stringify(value));
    }
  });

  return objectCopy;
};
