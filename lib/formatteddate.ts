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
export function timeAgo(timestamp:string) {
    const now:any = new Date();
    const past:any = new Date(timestamp);
    const diff = now - past;

    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) return `${seconds} seconds ago`;

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minutes ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;

    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} days ago`;

    const months = Math.floor(days / 30);
    if (months < 12) return `${months} months ago`;

    const years = Math.floor(months / 12);
    return `${years} years ago`;
}