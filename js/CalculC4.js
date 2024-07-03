import { getNbJoursOuvrablesPremiereSemaineJuillet, getNombreJoursPourMois } from './Utils.js';

export class CalculC4 {
    constructor(
        montantBrut = 0.0,
        traitementCentPourCent = 0.0,
        allocationFr = 0.0,
        indexation = 1.0,
        numerateurCharge = 1,
        denominateurCharge = 1,
        numeroMois = new Date().getMonth(),
        numeroAnnee = new Date().getFullYear()
    ) {
        this.montantBrut = montantBrut;
        this.traitementCentPourCent = traitementCentPourCent;
        this.allocationFr = allocationFr;
        this.indexation = parseFloat(indexation);
        this.numerateurCharge = numerateurCharge;
        this.denominateurCharge = denominateurCharge;
        this.numeroMois = numeroMois;
        this.numeroAnnee = numeroAnnee;
    }

    getMensuelBrut() {
        if (this.denominateurCharge == null || this.denominateurCharge === 0) {
            return 0;
        }
        return this.montantBrut + this.allocationFr;
    }

    getBrutExact() {
        if (this.denominateurCharge == null || this.denominateurCharge === 0) {
            return 0;
        }
        return this.getBrutJournalier() * getNombreJoursPourMois(this.numeroMois, this.numeroAnnee);
    }

    getBrutJuillet() {
        return this.getBrutJournalier() * getNbJoursOuvrablesPremiereSemaineJuillet(this.numeroAnnee);
    }

    getMensuelBrutIndexe() {
        if (this.denominateurCharge == null || this.denominateurCharge === 0) {
            return 0;
        }

        return (this.traitementCentPourCent * this.numerateurCharge / this.denominateurCharge * this.indexation / 12) + this.allocationFr;
    }

    getBrutJournalier() {
        console.log('Nombre de jours pour le mois : ' + getNombreJoursPourMois(this.numeroMois, this.numeroAnnee));
        console.log('Mensuel brut : ' + this.getMensuelBrut());
        return this.getMensuelBrut() / getNombreJoursPourMois(this.numeroMois, this.numeroAnnee);
    }
}
