import { codeFractions } from '../dictionaries/CodeFraction.js';

export function getFractionDescription(codeFraction) {

    // enlève tous les espaces
    codeFraction = codeFraction.replace(/\s/g, '');

    let description = '';

    if (codeFraction in codeFractions) {
        // Le code est directement dans le dictionnaire des codes particuliers
        description = codeFractions[codeFraction];
    } else if (codeFraction.startsWith('1111')) {
        // Traitement des cas où les 4 premiers caractères sont 1111 mais nécessitent une recherche dans le dictionnaire
        const codeSpecifique = codeFraction.slice(4);
        description = codeFractions[codeSpecifique] || 'Code inconnu après 1111';
    } else {
        // Traitement des cas de fractions de charge hebdomadaire
        const numerateur = codeFraction.slice(0, 3);
        const fractionHeure = parseInt(codeFraction.slice(3, 4), 10) / 8;
        const denominateur = codeFraction.slice(4);

        description = getDescriptionString(numerateur, fractionHeure, denominateur);

        return description;
    }
}

function getDescriptionString(numerateur, fractionHeure, denominateur) {

    // nettoyage: retire espaces et 0 inutiles. Ex. "  0027" => 27
    numerateur = numerateur.trim().replace(/^0+/, '');
    denominateur = denominateur.trim().replace(/^0+/, '');

    // Si pas de fraction d'heure, on retourne directement la description
    if (fractionHeure === 0 || isNaN(fractionHeure)) {
        return numerateur + '/' + denominateur;
    }

    return `Fraction de charge hebdomadaire : ${numerateur} heures et ${fractionHeure} d'une heure, pour une charge hebdomadaire complète de ${denominateur} heures`;
}