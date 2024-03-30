export function getDateFinString(data) {
    
    if (data == '0000') return '';

    const moisNoms = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

    // Extrait le mois et l'année à partir de la chaîne de données
    const moisIndex = parseInt(data.slice(0, 2), 10) - 1; // Convertit en nombre et ajuste l'index (0-11)
    const annee = data.slice(2, 4);
    const anneeComplete = `20${annee}`;

    return `${moisNoms[moisIndex]} ${anneeComplete}`;
}
