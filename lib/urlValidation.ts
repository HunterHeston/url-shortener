// Returns true if the string is a valid web address
// Assumes that user meant to include http:// or https:// if they didn't
export function isValidWebAddress(url: string): boolean {
  if (!url.includes("http://") && !url.includes("https://")) {
    url = "http://" + url;
  }

  try {
    console.log(url);
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
}
