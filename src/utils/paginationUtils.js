const paginateData = (data, currentPage, itemsPerPage) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return data.slice(startIndex, endIndex);
};

const calculateTotalPages = (data, itemsPerPage) => {
  return Math.ceil(data.length / itemsPerPage);
};

export { paginateData, calculateTotalPages };
