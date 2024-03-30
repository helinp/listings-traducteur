class Matricule {
    constructor(matricule) {
        // on enlève les espaces du matricule
        matricule = matricule.replace(/\s/g, '');

        this.matricule = matricule;
        this.sexe = parseInt(matricule.substring(0, 1), 10);
        this.anneeNaissance = this.getPrefixeAnnee(matricule.substring(1, 3));
        this.moisNaissance = parseInt(matricule.substring(3, 5), 10); // Stocker le mois tel quel pour l'instant
        this.jourNaissance = parseInt(matricule.substring(5, 7), 10);
        this.numeroSuite = matricule.substring(7, 9);
        this.numeroControle = matricule.substring(9, 11);
        this.dateNaissance = this.getDateNaissance(); // La date de naissance sera définie ici
    }

    getSexe() {
        return this.sexe % 2 === 0 ? "Féminin" : "Masculin";
    }

    getDateNaissance() {
        // Les mois sont indexés à partir de 0, donc on fait -1 ici
        return new Date(this.anneeNaissance, this.moisNaissance - 1, this.jourNaissance);
    }

    getPrefixeAnnee(anneeNaissance) {
        const anneeActuelle = new Date().getFullYear();
        let anneeComplete = parseInt(`20${anneeNaissance}`, 10);
        let age = anneeActuelle - anneeComplete;

        // Si l'âge calculé est improbable (moins de 23 ou plus de 70), on suppose que l'année doit commencer par "19"
        if (age < 23 || age > 70) {
            anneeComplete = parseInt(`19${anneeNaissance}`, 10);
        }
        return anneeComplete;
    }
}

export function getMatriculeDescription(matricule) {
    const matriculeObj = new Matricule(matricule);

    return {
        sexe: matriculeObj.getSexe(),
        dateNaissance: matriculeObj.getDateNaissance(),
        numeroSuite: matriculeObj.numeroSuite,
        numeroControle: matriculeObj.numeroControle,
        matricule: matriculeObj.matricule
    };
}