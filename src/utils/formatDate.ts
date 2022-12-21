const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-gb", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export default formatDate;
