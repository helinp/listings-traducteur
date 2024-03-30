import { camelCaseToSpaced } from './utils.js';

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

    // ajoute les th au header #table-header
    for (const prop of order) {
        const th = document.createElement('th');
        th.className = "px-6 py-3";
        th.textContent = camelCaseToSpaced(prop.charAt(0).toUpperCase() + prop.slice(1));
        document.querySelector('#table-header').appendChild(th);
    }

    for (const key of data) {
        const tr = document.createElement('tr');
        tr.className = "even:bg-gray-50 odd:bg-white border-b";

        // Données
        let transactions = key.transaction;
        let remunerations = key.remuneration;

        let line = { ...transactions, ...remunerations };

        for (const prop of order) {
            const td = document.createElement('td');
            td.className = "px-3 py-2 relative group";
            td.setAttribute('data-prop', prop);

            // Créez d'abord le contenu principal de la cellule.
            if (typeof line[prop].string === 'string') {
                td.innerHTML = line[prop].string;
            } else {
                td.innerHTML = formatTooltipContent(line[prop].valeur);
            }

            tr.appendChild(td);
        }

        tableData.appendChild(tr);
    }

    const footer = document.querySelector('#table-footer');
    footer.innerHTML = '';
    const tr = document.createElement('tr');
    tr.className = "even:bg-gray-50 odd:bg-white border-b";
    tr.innerHTML = '<td class="px-3 py-2 font-bold">Total</td>';

    for (const prop of order) {
        // saute le premier élément
        if (prop === 'statut') {
            continue;
        }

        const td = document.createElement('td');
        td.className = "px-3 py-2 font-bold";
        // Cette fois, la sélection est basée sur les 'td' ayant un attribut 'data-prop' correspondant à 'prop'
        const dataValues = tableData.querySelectorAll(`td[data-prop="${prop}"] span[data-value]`);
        let total = 0;
        let contientNumber = false;
        dataValues.forEach((element) => {
            // Utilise l'attribut data-value pour le calcul
            const value = parseFloat(element.getAttribute('data-value'));
            if (!isNaN(value)) {
                total += value;
                contientNumber = true;
            }
        });
        // Formatte le total en tant que monnaie
        if (!isNaN(total) && contientNumber) {
            td.textContent = total.toLocaleString('fr-BE', { style: 'currency', currency: 'EUR' });
        }
        tr.appendChild(td);
    }

    footer.appendChild(tr);
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

function formatTooltipContent(data) {

    if (typeof data === 'string') {
        // Si la valeur est une chaîne simple, retournez-la telle quelle
        return data;
    }

    // si undefined
    if (data === undefined) {
        return '';
    }

    // si NaN
    if (isNaN(data)) {
        return '';
    }

    // si float
    if (typeof data === 'number') {
        return '<span data-value="' + data.toString() + '">' + data.toLocaleString('fr-BE', { style: 'currency', currency: 'EUR' }) + '</span>';
    }

    let content = '';

    for (const [key, value] of Object.entries(data)) {
        // Ajoute un titre pour chaque clé principale
        content += `<div class='font-bold mt-2'>${key.charAt(0).toUpperCase() + key.slice(1)}:</div>`;

        if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
            // Si la valeur est un objet, itérez sur ses propriétés
            for (const [subKey, subValue] of Object.entries(value)) {
                content += `<div class='ml-2'>- ${subKey.charAt(0).toUpperCase() + subKey.slice(1)}: ${subValue}</div>`;
            }
        } else {
            // Pour les valeurs non-objet, les afficher directement sous le titre
            content += `<div class='ml-2'>- ${value}</div>`;
        }
    }

    return content;
}
