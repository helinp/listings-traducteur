export function CustomParseFloat(value) {
    // si termine par "-", le nombre est négaif
    if (value.endsWith("-")) {
        return parseFloat(value.replace(',', '.')) * -1;
    }

    return parseFloat(value.replace(',', '.'));
}

export function camelCaseToSpaced(value) {
    return value.replace(/([A-Z])/g, ' $1').trim();
}

