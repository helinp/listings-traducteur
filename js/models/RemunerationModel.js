
import { CustomParseFloat } from '../Utils.js';

export class RemunerationModel {
  constructor(patronaleONSS, remunerationBrute, allocationFoyerResidence, cotisationCVP, cotisationPersonnelleONSS, cotisationSolidarite, cotisationSpecialeSecuriteSociale, avantageNature, remunerationImposable, precompteProfessionnel, diversNonSoumis, allocationsFamiliales, retenueAllocationsFamiliales, remunerationNette) {

    this.patronaleONSS = {
      code: patronaleONSS,
      valeur: CustomParseFloat(patronaleONSS),
      nom: "Cotisation patronale ONSS"
    };

    // Chaque propriété est un objet contenant le code, la valeur et un nom explicatif.
    this.remunerationBrute = {
      code: remunerationBrute,
      valeur: CustomParseFloat(remunerationBrute),
      nom: "Rémunération brute calculée"
    };

    this.allocationFoyerResidence = {
      code: allocationFoyerResidence,
      valeur: CustomParseFloat(allocationFoyerResidence),
      nom: "Allocation de Foyer/Résidence"
    };

    this.cotisationCVP = {
      code: cotisationCVP,
      valeur: CustomParseFloat(cotisationCVP),
      nom: "Cotisation Veuve et Orphelin ou Cotisation Caisse de Pension Provinciale ou Cotisation Fond de Pension de Survie"
    };

    this.cotisationPersonnelleONSS = {
      code: cotisationPersonnelleONSS,
      valeur: CustomParseFloat(cotisationPersonnelleONSS),
      nom: "Cotisation personnelle ONSS"
    };

    this.cotisationSolidarite = {
      code: cotisationSolidarite,
      valeur: CustomParseFloat(cotisationSolidarite),
      nom: "Cotisation de solidarité"
    };

    this.cotisationSpecialeSecuriteSociale = {
      code: cotisationSpecialeSecuriteSociale,
      valeur: CustomParseFloat(cotisationSpecialeSecuriteSociale),
      nom: "Cotisation spéciale de sécurité sociale"
    };

    this.avantageNature = {
      code: avantageNature,
      valeur: CustomParseFloat(avantageNature),
      nom: "Avantage en nature"
    };

    this.remunerationImposable = {
      code: remunerationImposable,
      valeur: CustomParseFloat(remunerationImposable),
      nom: "Rémunération imposable"
    };

    this.precompteProfessionnel = {
      code: precompteProfessionnel,
      valeur: CustomParseFloat(precompteProfessionnel),
      nom: "Précompte professionnel"
    };

    this.diversNonSoumis = {
      code: diversNonSoumis,
      valeur: CustomParseFloat(diversNonSoumis),
      nom: "Divers non soumis à l’ONSS et/ou non imposable"
    };

    this.allocationsFamiliales = {
      code: allocationsFamiliales,
      valeur: CustomParseFloat(allocationsFamiliales),
      nom: "Allocations familiales"
    };

    this.retenueAllocationsFamiliales = {
      code: retenueAllocationsFamiliales,
      valeur: CustomParseFloat(retenueAllocationsFamiliales),
      nom: "Retenue sur les allocations familiales"
    };

    this.remunerationNette = {
      code: remunerationNette,
      valeur: CustomParseFloat(remunerationNette),
      nom: "Rémunération nette"
    };
  }
}
