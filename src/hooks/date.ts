const useDateDiff = (date: Date) => {
  const now = new Date();
  const today = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  ).getTime();
  const dateToCompare = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  ).getTime();
  return Math.round((dateToCompare - today) / (1000 * 60 * 60 * 24));
};

export default useDateDiff;
