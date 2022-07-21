/**
 * Capitalize input string and returns it
 * @param str
 * @returns
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
