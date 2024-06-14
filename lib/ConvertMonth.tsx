export default function convertToMonthYear(isoString:string) {
    // Create a new Date object from the ISO 8601 string
    const date = new Date(isoString);
    
    // Define an array of month names
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    
    // Get the month and year from the Date object
    const month = monthNames[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    
    // Return the formatted string
    return `${month} ${year}`;
}