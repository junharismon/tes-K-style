export function formatDate(dateString, id) {
    const date = new Date(dateString);

    let options = {
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    }
    if (id == 'home') {
        options.weekday = 'short';
        options.month = 'short';
    } else {
        options.weekday = 'long';
        options.month = 'long';
    }

    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    return formattedDate;
}



export function kelvinToCelcius(kelvin) {
    const celcius = kelvin - 273.15;
    return celcius.toFixed(2);
}