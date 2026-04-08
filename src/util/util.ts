export const getformattedTime = (date: string) => {
  if (date) {
    const dateTime = new Date(date);
    return dateTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // Converts to 12-hour format
    });
  } else return "";
};
export const getFormatedDate = (isoString: string) => {
  const date = new Date(isoString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
};
export const generateRoomId = (userId1: string, userId2: string): string => {
  return [userId1, userId2].sort().join("_");
};
