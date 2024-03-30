import { codeStatus } from '../dictionaries/CodeStatut.js';
import { codeDescriptions } from '../dictionaries/CodeTransaction.js';
import { getAnneeConcerneeDescription } from '../translators/AnneeConcernee.js';
import { getPeriodeConcerneeDescription, getPeriodeConcerneeString } from '../translators/PeriodeConcernee.js';
import { getFractionDescription } from '../translators/FractionTranslator.js';
import { getCodeStatutaireDescription } from '../translators/CodeIndexStatutaire.js';
import { getBaremeDescription, getPourcentageDescription } from '../translators/BaremePourcentage.js';
import { getAncienneteDescription } from '../translators/Anciennete.js';
import { CodeEtatCivil } from '../dictionaries/CodeEtatCivil.js';
import { getPersonnesChargeDescription } from '../translators/PersonnesCharge.js';
import { CodeTypeIndex } from '../dictionaries/CodeTypeIndex.js';
import { CodeRecuperation } from '../dictionaries/CodeRecuperation.js';
import { CodeTraitement } from '../dictionaries/CodeTraitement.js';
import { getCodePrecompteDescription } from '../translators/CodePrecompte.js';
import { CodeAllocationFoyerResidence } from '../dictionaries/CodeAllocationFoyerResidence.js';
import { CodeFonction } from '../dictionaries/CodeFonction.js';
import { CustomParseFloat } from '../Utils.js';
import { getDateFinString } from '../translators/DateFin.js';
import { getAbsenceHtml } from '../translators/Absences.js';
import { CodeAbsences } from '../dictionaries/CodeAbsences.js';

export class DetailTransactionModel {
    constructor(
        statut,
        codeTransaction,
        anneeConcernee,
        periodeConcernee,
        dateFin,
        fraction,
        codesAbsencesDivers,
        codeSocial,
        codeIndexStatutaire,
        barPourcentage,
        anciennete,
        codeEtatCivil,
        personnesCharge,
        codeTypeIndex,
        codeRecuperation,
        codeTraitementNonCodifie,
        pourcentagePrecompte,
        allocationFoyerResidence,
        cotisationSolidarite,
        codeFonction,
        traitementCentPourCent
    ) {
        this.statut = {
            code: statut,
            string: codeStatus[statut] || "Statut inconnu",
            valeur: codeStatus[statut] || "Statut inconnu",
            nom: "Statut"
        };

        this.codeTransaction = {
            code: codeTransaction,
            string: codeDescriptions[codeTransaction] || "Code inconnu",
            nom: "Code de Transaction"
        };

        this.anneeConcernee = {
            code: anneeConcernee,
            string: getAnneeConcerneeDescription(anneeConcernee),
            data: getAnneeConcerneeDescription(anneeConcernee),
            nom: "Année concernée"
        }

        this.periodeConcernee = {
            code: periodeConcernee,
            string: getPeriodeConcerneeString(periodeConcernee, getAnneeConcerneeDescription(anneeConcernee)),
            data: getPeriodeConcerneeDescription(periodeConcernee, getAnneeConcerneeDescription(anneeConcernee)),
            nom: "Période concernée"
        };

        this.dateFin = {
            code: dateFin,
            valeur: 'TODO',
            nom: "Date de fin",
            string: getDateFinString(dateFin)
        }

        this.fraction = {
            code: fraction,
            valeur: getFractionDescription(fraction),
            string: getFractionDescription(fraction),
            nom: "Fraction"
        }

        this.codesAbsencesDivers = {
            code: codesAbsencesDivers,
            valeur: CodeAbsences[codesAbsencesDivers] || "Code inconnu",
            string: getAbsenceHtml(codesAbsencesDivers),
            nom: "Codes congés, absences, disponibilités, divers (DI)"
        }

        this.codeSocial = {
            code: codeSocial,
            doc: "Ce code combine le régime de sécurité sociale (ONSS, FPS, CPP, COE) et le mode de paiement (1/12ième ou 360ième).",
            valeur: codeSocial,
            nom: "Code social"
        }

        this.codeIndexStatutaire = {
            code: codeIndexStatutaire,
            valeur: getCodeStatutaireDescription(codeIndexStatutaire),
            string: getCodeStatutaireDescription(codeIndexStatutaire).index + " - " + getCodeStatutaireDescription(codeIndexStatutaire).statutaire.status + " - " + getCodeStatutaireDescription(codeIndexStatutaire).statutaire.fonction,
            nom: "Code index et statutaire (IF)"
        }

        this.barCode = {
            code: barPourcentage,
            doc: "Cette zone représente le code communautaire du barème utilisé.",
            valeur: getBaremeDescription(barPourcentage),
            string: getBaremeDescription(barPourcentage),
            nom: "Code barème"
        }

        this.barPourcentage = {
            code: barPourcentage,
            valeur: getPourcentageDescription(barPourcentage),
            string: getPourcentageDescription(barPourcentage),
            nom: "Code barème et pourcentage"
        }

        this.anciennete = {
            code: anciennete,
            valeur: getAncienneteDescription(anciennete),
            nom: "Ancienneté barémique",
            string: getAncienneteDescription(anciennete).annees + " ans " + getAncienneteDescription(anciennete).mois + " mois " + getAncienneteDescription(anciennete).code
        }
        this.codeEtatCivil = {
            code: codeEtatCivil,
            valeur: (CodeEtatCivil[codeEtatCivil] || "Code inconnu"),
            nom: "Code état civil"
        }

        this.personnesCharge = {
            code: personnesCharge,
            valeur: getPersonnesChargeDescription(personnesCharge),
            string: personnesCharge,
            nom: "Personnes à charge"
        }

        this.codeTypeIndex = {
            code: codeTypeIndex,
            doc: "Indique le mode d’indexation à appliquer au traitement à 100%.",
            valeur: CodeTypeIndex[codeTypeIndex] || "Code inconnu",
            nom: "Code type d’index",
            string: codeTypeIndex
        }

        this.codeRecuperation = {
            code: codeRecuperation,
            doc: "Ce code détermine la procédure de récupération à appliquer lors d'une régularisation par codes transaction 05 et 06 se soldant par un montant négatif.",
            valeur: CodeRecuperation[codeRecuperation] || "Code inconnu",
            nom: "Code de récupération",
            string: codeRecuperation
        }

        this.codeTraitementNonCodifie = {
            code: codeTraitementNonCodifie,
            valeur: CodeTraitement[codeTraitementNonCodifie] || "Code inconnu",
            nom: "Code traitement non codifié (TR N. CD)"
        }

        this.pourcentagePrecompte = {
            code: pourcentagePrecompte,
            valeur: getCodePrecompteDescription(pourcentagePrecompte),
            nom: "Pourcentage de précompte",
            string: getCodePrecompteDescription(pourcentagePrecompte).pourcentage
        }

        this.allocationFoyerResidence = {
            code: allocationFoyerResidence,
            valeur: CodeAllocationFoyerResidence[allocationFoyerResidence] || "Code inconnu",
            doc: "Cette zone détermine l’allocation de foyer ou de résidence à calculer.",
            nom: "Allocation foyer et résidence"
        }
        this.cotisationSolidarite = {
            code: cotisationSolidarite,
            valeur: 'NA',
            doc: "Cotisation supprimée en 1990.",
            nom: "Cotisation de solidarité"
        }

        this.codeFonction = {
            code: codeFonction,
            valeur: CodeFonction[codeFonction] || "Code inconnu",
            doc: "Code de fonction",
            nom: "Code de fonction"

        }

        this.traitementCentPourCent = {
            code: traitementCentPourCent,
            valeur: CustomParseFloat(traitementCentPourCent),
            nom: "Traitement à 100%"
        }
    }
}
