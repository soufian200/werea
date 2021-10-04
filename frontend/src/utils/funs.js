const isEmpty = (obj) => {
  const ob = Object.keys(obj);
  if (ob.length > 0) {
    return false;
  }
  return true;
};
function getExtention(f) {
  const a = f.split(".");
  return a[a.length - 1];
}
export { isEmpty, getExtention };
