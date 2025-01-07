// export const getCookieValue = (cookieString, key) => {
//   const match = cookieString.match(new RegExp(`(^|;\\s*)${key}=([^;]+)`));
//   return match ? decodeURIComponent(match[2]) : null;
// };

export const getCookieValue = (
  cookieString: string,
  key: string
): string | null => {
  const match = cookieString.match(new RegExp(`(^|;\\s*)${key}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
};
