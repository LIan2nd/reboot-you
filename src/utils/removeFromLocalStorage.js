const removeFromLocalStorage = (key) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
}

export default removeFromLocalStorage;
