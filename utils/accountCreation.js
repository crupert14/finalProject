const getDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // Month is 0-indexed
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

module.exports = { getDate };