export const formatDate = (params) => {
    const segments = params.row.date.split("/");
    const date = new Date();
    date.setFullYear(segments[2]);
    date.setMonth(Number(segments[1]) + 1);
    date.setDate(segments[0])

    return date;
}