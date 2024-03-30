export function getPersonnesChargeDescription(code) {
    // Convertir le code en entier pour faciliter les comparaisons
    const numericCode = parseInt(code, 10);
    
    let statusEnseignant = numericCode <= 59 ? 'non handicapé' : 'handicapé';
    let statusConjoint = (numericCode <= 19 || (numericCode >= 40 && numericCode <= 59)) ? 'non à charge' : 'à charge handicapé';
    let enfants = 'Pas d’enfants';
    
    // Déterminer le nombre d'enfants à charge selon le code individuel
    const enfantsCode = numericCode % 10;
    if (enfantsCode === 1) {
        enfants = '1 enfant';
    } else if (enfantsCode > 2) {
        enfants = `${enfantsCode} enfants (handicapé compte pour 2)`;
    }
    
    // Cas particulier pour le code '00'
    if (numericCode === 0) {
        statusEnseignant = 'non handicapé';
        statusConjoint = 'non à charge';
    }
    
    // Cas particulier pour le code '80'
    if (numericCode === 80) {
        statusEnseignant = 'handicapé';
        statusConjoint = 'à charge handicapé';
    }
    
    // Construire l'objet de description
    return {
        enseignant: `Enseignant ${statusEnseignant}`,
        conjoint: `Conjoint ${statusConjoint}`,
        enfants: enfants
    };
}
