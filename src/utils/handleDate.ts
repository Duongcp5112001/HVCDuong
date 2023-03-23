export function getDayOfWeek(date: Date){
    if(!date) return
    const weekday = ['日','月','火','水','木','金','土']
    const day = date.getDay()
    return weekday[day]
}
export function formatDateSymbol(date: Date, separator: string) {
    if(!date) return
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    return `${year}${separator}${month}${separator}${day}`;
}
export function addDateToDay(date: Date, days: number) {
    if(!date) return
    let startDate = new Date(date.getTime())
    startDate.setDate(startDate.getDate() + days);
    return startDate;
}

export function formatDateJp(dateOfStay: Date) {
    const options : Intl.DateTimeFormatOptions | undefined  = { year: 'numeric', month: 'long', day: 'numeric'};
    return dateOfStay ? dateOfStay.toLocaleDateString('ja-JP',  options) : null;
}
