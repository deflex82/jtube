export default function extractDate(dateTimeString:string) {
    // Create a Date object
    const dateObj = new Date(dateTimeString);

    // Extract the year, month, and day
    const year = dateObj.getUTCFullYear();
    const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(dateObj.getUTCDate()).padStart(2, '0');

    // Format the date as "YYYY-MM-DD"
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
}

// Example usage
// Output: "2024-06-07"
