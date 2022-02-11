export const FormatDateString = (date) => {
  const parsedDate = date instanceof Date ? date : new Date(Date.parse(date));
  const day = Intl.DateTimeFormat("en", { day: "2-digit" }).format(parsedDate);
  const month = Intl.DateTimeFormat("en", { month: "short" }).format(
    parsedDate
  );
  const year = Intl.DateTimeFormat("en", { year: "numeric" }).format(
    parsedDate
  );
  return `${day} ${month} ${year}`;
};
