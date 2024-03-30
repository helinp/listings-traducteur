

export function getBaremeDescription(data) {
    return data.slice(0, 3);
}

export function getPourcentageDescription(data) {
    let number = data.slice(4, 6);

    if(getBaremeDescription(data) === '999') {
        return '0%';
    }

    if(number === '00') {
        return '100%';
    }

    // retire les 0 au début
    number = number.replace(/^0+/, '');

    return `${number}%`;
}