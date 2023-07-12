const trimTitle = (title: String) => {
  if (title.length < 95) {
    return title;
  }
  return title.substring(0, 95) + "...";
};

export default trimTitle;
