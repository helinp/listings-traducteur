export function getPeriodeConcerneeDescription(periodeConcernee, anneeConcernee) {
    // Assurez-vous que la période et l'année sont des chaînes
    periodeConcernee = String(periodeConcernee);
    anneeConcernee = String(anneeConcernee);
    
    // Suppression des points si présents (dans le cas où la chaîne est '0103.3103', par exemple)
    periodeConcernee = periodeConcernee.replace(/\./g, '');

    // Utiliser la méthode slice pour obtenir les jours et les mois de début et de fin
    let periodeDebut = dataVersDate(periodeConcernee.slice(0, 2), periodeConcernee.slice(2, 4), anneeConcernee);
    let periodeFin = dataVersDate(periodeConcernee.slice(4, 6), periodeConcernee.slice(6, 8), anneeConcernee);

    return { periodeDebut, periodeFin };
}

export function getPeriodeConcerneeString(periodeConcernee, anneeConcernee) {
    let { periodeDebut, periodeFin } = getPeriodeConcerneeDescription(periodeConcernee, anneeConcernee);

    // Correction pour obtenir un format de date plus lisible et correcte
    // Utilisation de toLocaleDateString pour un formatage localisé
    let formatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    let periodeDebutString = periodeDebut.toLocaleDateString('fr-BE', formatOptions);
    let periodeFinString = periodeFin.toLocaleDateString('fr-BE', formatOptions);

    return `${periodeDebutString} - ${periodeFinString}`;
}

function dataVersDate(jour, mois, annee) {
    // Ajout d'un zéro si le jour ou le mois est à un seul chiffre pour correspondre au format YYYY-MM-DD
    jour = jour.padStart(2, '0');
    mois = mois.padStart(2, '0');

    return new Date(`${annee}-${mois}-${jour}`);
}
