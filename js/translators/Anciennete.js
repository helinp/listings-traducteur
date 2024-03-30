import { codeAnciennetes } from '../dictionaries/CodeAnciennete.js';

/**
 * Récupère la description de l'ancienneté
 * @param {string} data 
 * @returns {object} 
 */
export function getAncienneteDescription(data) {

    /**
    Pos 1 et 2 Nombre d’années de l’ancienneté permettant de déterminer l’échelon barémique.
    Pos 3 et 4 Nombre de mois supplémentaire de l’ancienneté.
    Pos 5 Code spécial permettant de déroger aux règles normales d’avancement de l’ancienneté pécuniaire, soit :
    Code = 0  cas normal
    Code = 6  permet l’avancement de l’ancienneté pour un code transaction 04 ne commençant pas le premier jour du mois
    Code = 8 permet d’avancer de 5 ans l’âge minimum de départ de l’ancienneté barémique
    Code = 9  permet le blocage de l’ancienneté lorsqu’elle atteint 10 ans (ancienne réglementation pour les charges incomplètes)
    */

    // retire tt les espaces
    data = data.replace(/\s/g, '');

    const annees = data.slice(0, 2);
    const mois = data.slice(2, 4);
    const code = data.slice(4, 5);


    return {
        annees: annees,
        mois: mois,
        code: getCodeDescription(code)
    };
}

function getCodeDescription(code) {
    return codeAnciennetes[code] || "Code inconnu";
}