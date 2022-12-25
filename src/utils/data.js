export function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === 'http:' || url.protocol === 'https:';
}

export const downloadRes = (fetchData, name) => {
  var blob = new Blob([fetchData]);
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = name;
  link.click();
};
