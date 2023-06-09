
export const debounce = (func, wait) => {
    let timeoutId;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func, wait);
}