export function getAnneeConcerneeDescription(anneeConcernee) {
    // siècle courant
    const currentCentury = new Date().getFullYear().toString().slice(0, 2);
    return `${currentCentury}${anneeConcernee}`;
}