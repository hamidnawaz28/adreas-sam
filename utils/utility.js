function compare(val, decending = false) {
  return (a, b) => {
    const nameA = a[val];
    const nameB = b[val];
    let comparison = 0;
    if (nameA > nameB) {
      decending ? (comparison = -1) : (comparison = 1);
    } else if (nameA < nameB) {
      decending ? (comparison = 1) : (comparison = -1);
    }
    return comparison;
  };
}

const addUnavailableItem = (array, id) => {
  if (array.includes(id)) {
    return array.filter((item) => item !== id);
  }
  return [...array, id];
};
const getTimeStamp = (dateString) => new Date(dateString).getTime();

export { compare, addUnavailableItem };
