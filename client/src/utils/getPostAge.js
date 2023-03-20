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
        return `${years}y`;
    } else if (months > 0) {
        return `${months}m`;
    } else if (days > 0) {
        return `${days}d`;
    } else if (hours > 0) {
        return `${hours}h`;
    } else if (minutes > 0) {
        return `${minutes}m`;
    } else {
        return "just now";
    }
};
