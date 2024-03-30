export function getCodePrecompteDescription(codePrecompte) {
    const numericCode = parseInt(codePrecompte, 10);
    let description = '';
    let pourcentage = 0;

    if (numericCode === 0) {
        description = "Précompte calculé d'après les barèmes établis par le SPF FINANCES pour le calcul du précompte professionnel.";
    } else if (numericCode >= 1 && numericCode <= 50) {
        description = "Pourcentage à appliquer à l'imposable pour le calcul du précompte.";
        pourcentage = numericCode;
    } else if (numericCode === 97) {
        description = "Idem code ‘00’ avec condition sur les revenus du conjoint ne dépassant pas 432,00 EUR nets par mois.";
    } else if (numericCode === 98) {
        description = "Idem code ‘00’ avec condition sur les revenus du conjoint ne dépassant pas 216,00 EUR nets par mois.";
    } else if (numericCode === 99) {
        description = "Pas de précompte calculé.";
    } else {
        description = "Code de précompte non reconnu.";
    }

    return {
        description: description,
        pourcentage: pourcentage + '%'
    };
}
