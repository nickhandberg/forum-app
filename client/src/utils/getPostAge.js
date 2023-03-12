export const getPostAge = (date) => {
    var postDate = new Date(date);
    var today = new Date();

    var diff = Math.floor(today.getTime() - postDate.getTime());
    var minute = 1000 * 60;

    var minutes = Math.floor(diff / minute);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);
    var months = Math.floor(days / 31);
    var years = Math.floor(months / 12);

    if (years > 0) {
        return `${years} ${years > 1 ? "years" : "year"} ago`;
    } else if (months > 0) {
        return `${months} ${months > 1 ? "months" : "month"} ago`;
    } else if (days > 0) {
        return `${days} ${days > 1 ? "days" : "day"} ago`;
    } else if (hours > 0) {
        return `${hours} ${hours > 1 ? "hours" : "hour"} ago`;
    } else if (minutes > 0) {
        return `${minutes} ${minutes > 1 ? "minutes" : "minute"} ago`;
    } else {
        return "just now";
    }
};
