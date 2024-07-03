export function CustomParseFloat(value) {
    // si termine par "-", le nombre est négaif
    if (value.endsWith("-")) {
        return parseFloat(value.replace(',', '.')) * -1;
    }

    return parseFloat(value.replace(',', '.'));
}

export function camelCaseToSpaced(value) {
    return value.replace(/([A-Z])/g, ' $1').trim();
}


export function constructTableHeader(tableHeader, order) {
    // ajoute les th au header #table-header
    for (const prop of order) {
        const th = document.createElement('th');
        th.className = "px-6 py-3";
        th.textContent = camelCaseToSpaced(prop.charAt(0).toUpperCase() + prop.slice(1));
        tableHeader.appendChild(th);
    }
}

export function constructTableData(tableData, data, order) {
    for (const key of data) {
        const tr = document.createElement('tr');
        tr.className = "even:bg-gray-50 odd:bg-white border-b";

        // Données
        let transactions = key.transaction;
        let remunerations = key.remuneration;

        let line = { ...transactions, ...remunerations };

        for (const prop of order) {
            const td = document.createElement('td');
            if (typeof line[prop].valeur === 'number') {
                td.setAttribute('data-value', line[prop].valeur);
            }
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
}

export function constructTableCustomData(tableDimonaData, customData, order) {
    const tr = document.createElement('tr');
    tr.className = "even:bg-gray-50 odd:bg-white border-b";

    for (const prop of order) {
        const td = document.createElement('td');
        td.className = "px-3 py-2 relative group";
        td.setAttribute('data-prop', prop);
        td.setAttribute('data-value', customData[prop].valeur);

        // Créez d'abord le contenu principal de la cellule.
        if (typeof customData[prop].string === 'string') {
            td.innerHTML = customData[prop].string;
        } else {
            td.innerHTML = formatTooltipContent(customData[prop].valeur);
        }

        tr.appendChild(td);
    }

    tableDimonaData.appendChild(tr);
}

export function formatTooltipContent(data) {

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
        return data.toLocaleString('fr-BE', { style: 'currency', currency: 'EUR' });
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
export function constructTableFooter(footer, tableData, order) {
    const tr = document.createElement('tr');
    tr.className = "even:bg-gray-50 odd:bg-white border-b";
    tr.innerHTML = '<td class="px-3 py-2 font-bold">Total</td>';
    let i = 0;
    for (const prop of order) {

        // saute la première colonne
        if (i === 0) {
            i++;
            continue;
        }

        const td = document.createElement('td');
        const dataValues = tableData.querySelectorAll(`td[data-prop="${prop}"]`);
        let total = 0;
        let contientNumber = false;

        td.className = "px-3 py-2 font-bold";

        dataValues.forEach((element) => {
            const value = parseFloat(element.getAttribute('data-value'));
            if (!isNaN(value)) {
                total += value;
                contientNumber = true;
            }
        });
        // Formatte le total en tant que monnaie si nécessaire
        if (!isNaN(total) && contientNumber) {
            td.textContent = total.toLocaleString('fr-BE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 3});
        }
        tr.appendChild(td);
    }

    footer.appendChild(tr);
}

export function getNbJoursOuvrablesPremiereSemaineJuillet(annee) {
    const date = new Date(annee, 6, 1); // 1er juillet de l'année donnée
    let joursOuvrables = 0;

    while (date.getDay() !== 0) { // Tant que ce n'est pas dimanche
        const dayOfWeek = date.getDay();
        if (dayOfWeek >= 1 && dayOfWeek <= 5) { // Du lundi au vendredi
            joursOuvrables++;
        }
        date.setDate(date.getDate() + 1);
    }

    return joursOuvrables;
}

export function getNombreJoursPourMois(numeroMois, annee) {
    // Retourne le nombre de jours dans un mois donné
    return new Date(annee, numeroMois + 1, 0).getDate();
}




