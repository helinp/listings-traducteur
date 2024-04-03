export class CalculDimona {
    constructor(montantBrut, montantFr, montantAnnuel100, indexation, numerateurCharge, denominateurCharge) {
        this.montantBrut = montantBrut;
        this.montantFr = montantFr;
        this.montantAnnuel100 = montantAnnuel100;
        this.indexation = indexation;
        this.numerateurCharge = numerateurCharge;
        this.denominateurCharge = denominateurCharge;
    }

    getMensuelBrut() {
        // Retourne null si denominateurCharge est 0
        if (this.denominateurCharge === 0 || this.denominateurCharge === null) {
            return null;
        }
        return this.montantBrut + this.montantFr;
    }

    getMensuelBrutIndexe() {
        // Retourne null si denominateurCharge est 0
        if (this.denominateurCharge === 0 || this.denominateurCharge === null) {
            return null;
        }
        return (this.montantAnnuel100 * this.indexation * this.numerateurCharge) / this.denominateurCharge / 12;
    }
}
