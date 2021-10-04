const key = "_tid";

const storeUser = token=>localStorage.setItem(key, token);
const getUser = ()=>localStorage.getItem(key);
const removeUser = ()=>localStorage.removeItem(key);
export default { storeUser, getUser, removeUser };