const loadFromLocalStorage = (key) => {
  try {
    const serializedValue = localStorage.getItem(key);
    return JSON.parse(serializedValue);
  } catch (error) {
    console.error("Error loading from localStorage", error);
    return null;
  }
}

export default loadFromLocalStorage;