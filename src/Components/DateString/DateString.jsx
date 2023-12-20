export default function DateString({ dateString }) {
    const time = new Date(dateString).toLocaleTimeString("he-IL");
    const date = new Date(dateString).toLocaleDateString("he-IL");
    return `${date} ${time}`;
}