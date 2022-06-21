const compare = <DataType>(val: DataType, decending?: boolean) => {
  return (a: any, b: any) => {
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
};

const addUnavailableItem = (array: any, id: number) => {
  if (array.includes(id)) {
    return array.filter((item: any) => item !== id);
  }
  return [...array, id];
};
const getTimeStamp = (dateString: string) => new Date(dateString).getTime();

const filterUniqueEntries = <DataType, ObjectType>(
  data: DataType[],
  value: ObjectType
) => {
  let appTypes = data
    .map((el: any) => el[value])
    .filter((el: string) => el != null);

  return (appTypes = appTypes.filter(
    (val, index, acc) => acc.indexOf(val) === index
  ));
};

const rangeFilter = <DataType>(data: DataType[], page: number) => {
  return data.filter(
    (_, index) => index >= page * 10 && index < page * 10 + 10
  );
};

export {
  compare,
  addUnavailableItem,
  filterUniqueEntries,
  rangeFilter,
  getTimeStamp,
};
