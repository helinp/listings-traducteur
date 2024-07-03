import {constructTableCustomData, constructTableData, constructTableFooter, constructTableHeader } from './Utils.js';
import { CalculDimona } from './CalculDimona.js';
import { CalculC4 } from './CalculC4.js';

// Fonction pour gérer les données PDF
export function injectSelectMdp(data) {
    console.log('Données extraites du PDF', data);

    // ajoute hidden à #form
    document.querySelector('#form').classList.add('hidden');

    // injecte les données dans le select-mdp
    getAllMdp(data);

    // retire hidden des classes de select-mdp  
    document.querySelector('#div-select-mdp').classList.remove('hidden');
}

export function showHeader(data, index) {

    data = data[index].header;

    // personnalInfos
    const personalInfos = document.querySelector('#personalInfos');

    personalInfos.querySelector('#matricule').textContent = data.matricule.matricule;
    personalInfos.querySelector('#nomPrenom').textContent = data.nomPrenom;
    personalInfos.querySelector('#numeroCompte').textContent = data.numeroCompte;
    personalInfos.querySelector('#adresseRue').textContent = data.adresseRue;
    personalInfos.querySelector('#adresseVille').textContent = data.adresseCodePostal + ' ' + data.adresseVille;
}

export function showTable(data, index) {
    // Supposant que data[index].table est un tableau d'objets
    data = data[index].table;

    const tableData = document.querySelector('#table-data');
    const tableFooter = document.querySelector('#table-footer');
    const tableHeader = document.querySelector('#table-header');

    if (!tableData) return;

    tableData.innerHTML = '';
    tableFooter.innerHTML = '';
    tableHeader.innerHTML = '';

    // Définition de l'ordre des colonnes
    const order = [

        // transaction
        'statut',
        'codeTransaction',
        'periodeConcernee',
        'dateFin',
        'fraction',
        'codesAbsencesDivers',
        'codeSocial',
        'codeIndexStatutaire',
        'barCode',
        'barPourcentage',
        'anciennete',
        'codeEtatCivil',
        'personnesCharge',
        'codeTypeIndex',
        'codeRecuperation',
        'codeTraitementNonCodifie',
        'pourcentagePrecompte',
        'allocationFoyerResidence',
        'cotisationSolidarite',
        'codeFonction',
        'traitementCentPourCent',

        // remuneration
        'patronaleONSS',
        'remunerationBrute',
        'allocationFoyerResidence',
        'cotisationCVP',
        'cotisationPersonnelleONSS',
        'cotisationSolidarite',
        'cotisationSpecialeSecuriteSociale',
        'avantageNature',
        'remunerationImposable',
        'precompteProfessionnel',
        'diversNonSoumis',
        'allocationsFamiliales',
        'retenueAllocationsFamiliales',
        'remunerationNette'
    ];

    constructTableHeader(tableHeader, order);
    constructTableData(tableData, data, order);
    constructTableFooter(tableFooter, tableData, order);
}

function getAllMdp(data) {
    const selectMdp = document.querySelector('#select-mdp');

    // append 'Choisir un membre du personnel' option
    const option = document.createElement('option');
    option.value = -1;
    option.textContent = 'Sélectionnez un membre du personnel';
    selectMdp.appendChild(option);


    data.forEach((mdp, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = mdp.header.nomPrenom;
        selectMdp.appendChild(option);
    });
}

export function showCalculDimona(data, index) {

    // pour chaque ligne 
    data = data[index].table;

    // récupère l'index de l'input input-float-index
    const indexation = parseFloat(document.querySelector('#input-float-index').value);
    const [calculDimonas, indexTables] = getCalculDimona(data, indexation);

    // affiche les resultats 
    showCalculDimonaTable(calculDimonas, indexTables, data);

}

function showCalculDimonaTable(calculDimonas, indexTables, data) {

    // table-dimona-data
    const tableDimonaData = document.querySelector('#table-dimona-data');
    const tableDimonaFooter = document.querySelector('#table-dimona-footer');
    const tableDimonaHeader = document.querySelector('#table-dimona-header');

    if (!tableDimonaData) return;

    tableDimonaData.innerHTML = '';
    tableDimonaHeader.innerHTML = '';
    tableDimonaFooter.innerHTML = '';

    const order = [
        'codeFonction',
        'periodeConcernee',
        'remunerationBrute',
        'allocationFoyerResidence',
        'traitementCentPourCent',
        'fraction',
        'calculDimona',
        'calculDimonaIndexe'
    ];

    constructTableHeader(tableDimonaHeader, order);

    for(const key of indexTables) {
        // calculDimonas en cours
        const calculDimona = calculDimonas[indexTables.indexOf(key)];

        const tr = document.createElement('tr');
        tr.className = "even:bg-gray-50 odd:bg-white border-b";

        // Données
        let mensuelBrut = calculDimona.getMensuelBrut();
        let mensuelBrutIndexe = calculDimona.getMensuelBrutIndexe();

        const customData = {
            codeFonction: data[indexTables.indexOf(key)].transaction.codeFonction,
            periodeConcernee: data[indexTables.indexOf(key)].transaction.periodeConcernee,
            remunerationBrute: {
                valeur: mensuelBrut,
                string: mensuelBrut.toLocaleString('fr-BE', { style: 'currency', currency: 'EUR' })
            },
            allocationFoyerResidence: {
                valeur: calculDimona.montantFr,
                string: calculDimona.montantFr.toLocaleString('fr-BE', { style: 'currency', currency: 'EUR' })
            },
            traitementCentPourCent: {
                valeur: calculDimona.montantAnnuel100,
                string: calculDimona.montantAnnuel100.toLocaleString('fr-BE', { style: 'currency', currency: 'EUR' })
            },
            fraction: {
                valeur: calculDimona.numerateurCharge + '/' + calculDimona.denominateurCharge,
                string: calculDimona.numerateurCharge + '/' + calculDimona.denominateurCharge
            },
            calculDimona: {
                valeur: mensuelBrut,
                string: mensuelBrut.toLocaleString('fr-BE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 3  })
            },
            calculDimonaIndexe: {
                valeur: mensuelBrutIndexe,
                string: mensuelBrutIndexe.toLocaleString('fr-BE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 3  })
            }
        };
        
        constructTableCustomData(tableDimonaData, customData, order);
    }

    // calcul du total
    constructTableFooter(tableDimonaFooter, tableDimonaData, order);
}

function getCalculDimona(data, indexation) {

    var calculsDimona = [];
    var indexTables = [];

    for (const key of data) {

        if (!key.transaction.fraction.valeur) {
            continue;
        }

        indexTables.push(key);

        // récupère remunerationBrute, allocationFoyerResidence, traitementCentPourCent, fraction, 
        const remunerationBrute = key.remuneration.remunerationBrute.valeur;
        const allocationFoyerResidence = key.remuneration.allocationFoyerResidence.valeur;
        const traitementCentPourCent = key.transaction.traitementCentPourCent.valeur;
        const fraction = key.transaction.fraction.valeur;
        const [num, denom] = fraction.replace(' ', '').split('/');

        const calculDimona = new CalculDimona(
            remunerationBrute,
            allocationFoyerResidence,
            traitementCentPourCent,
            indexation,
            num,
            denom
        );

        calculsDimona.push(calculDimona);
    }

    return [calculsDimona, indexTables];
}

export function showCalculC4(data, index) {
    const tableData = data[index].table; // Utilisez une variable locale au lieu de réassigner data

    const indexation = parseFloat(document.querySelector('#input-float-index').value);
    const [calculC4s, indexTables] = getCalculC4(tableData, indexation);

    showCalculC4Table(calculC4s, indexTables, tableData);
}

function showCalculC4Table(calculC4s, indexTables, data) {
    const tableC4Data = document.querySelector('#table-c4-data');
    const tableC4Footer = document.querySelector('#table-c4-footer');
    const tableC4Header = document.querySelector('#table-c4-header');

    if (!tableC4Data) return;

    tableC4Data.innerHTML = '';
    tableC4Header.innerHTML = '';
    tableC4Footer.innerHTML = '';

    const order = ['codeFonction', 'periodeConcernee', 'salaireBrutIndexe', 'salaireBrutJuillet'];
    constructTableHeader(tableC4Header, order);

    indexTables.forEach((key, index) => {
        let calculC4 = calculC4s[index];
        let dataItem = data[index];

        const mensuelBrutIndexe = calculC4.getMensuelBrutIndexe();
        const mensuelBrutJuillet = calculC4.getBrutJuillet();
        const customData = {
            codeFonction: dataItem.transaction.codeFonction,
            periodeConcernee: dataItem.transaction.periodeConcernee,
            salaireBrutIndexe: {
                valeur: mensuelBrutIndexe,
                string: mensuelBrutIndexe.toLocaleString('fr-BE', { style: 'currency', currency: 'EUR' })
            },
            salaireBrutJuillet: {
                valeur: mensuelBrutJuillet,
                string: mensuelBrutJuillet.toLocaleString('fr-BE', { style: 'currency', currency: 'EUR' })
            }
        };

        constructTableCustomData(tableC4Data, customData, order);
    });

    constructTableFooter(tableC4Footer, tableC4Data, order);
}

function getCalculC4(data, indexation) {

    var calculsC4 = [];
    var indexTables = [];

    for (const key of data) {

        if (!key.transaction.fraction.valeur) {
            continue;
        }

        indexTables.push(key);

        const remunerationBrute = key.remuneration.remunerationBrute.valeur;
        const allocationFoyerResidence = key.remuneration.allocationFoyerResidence.valeur;
        const traitementCentPourCent = key.transaction.traitementCentPourCent.valeur;
        const fraction = key.transaction.fraction.valeur;
        const [num, denom] = fraction.replace(' ', '').split('/');

        const calculC4 = new CalculC4(
            remunerationBrute,
            traitementCentPourCent,
            allocationFoyerResidence,
            indexation,
            num,
            denom,
            key.transaction.periodeConcernee.data.periodeDebut.getMonth(),
            key.transaction.anneeConcernee.data
        );

        calculsC4.push(calculC4);
    }

    return [calculsC4, indexTables];
}

