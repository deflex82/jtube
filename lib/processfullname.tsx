function processFullname(fullname:string) {
    if (fullname?.slice(-4) === "null") {
        return fullname.slice(0, -4);
    }
    return fullname;
}

// Example usage
export default processFullname;