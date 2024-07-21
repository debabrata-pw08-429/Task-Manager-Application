export function convertDateTime(dateTimeString) {
  // Create a JavaScript Date object from the string
  const dateObject = new Date(dateTimeString);

  // Define options for formatting the date part
  const dateOptions = {
    day: "numeric", // Day of the month with leading zero (like 01)
    month: "numeric", // Numeric representation of the month (like 09)
    year: "numeric", // Numeric representation of the year (like 2024)
  };

  // Format the date part
  const formattedDate = dateObject.toLocaleDateString("en-US", dateOptions);

  // Extract hours and format time with AM/PM indicator
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes().toString().padStart(2, "0"); // Ensure two digits for minutes
  const amPm = hours >= 12 ? "pm" : "am";
  const formattedTime = `${hours % 12 || 12}:${minutes} ${amPm}`;

  // Combine formatted date and time with "Created at" prefix
  return `Created at ${formattedDate}, ${formattedTime}`;
}
