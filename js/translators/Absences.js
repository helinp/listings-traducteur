import { CodeAbsences } from "../dictionaries/CodeAbsences.js";

export function getAbsenceHtml(data) {
    

    if (data === "00") {
        return '';
    }

    const absencesTexte = CodeAbsences[data] || "Absence inconnue: " + data;
    const tronque = absencesTexte.length > 30 ? absencesTexte.substring(0, 30) + "..." : absencesTexte;

    return `<span data-toggle="tooltip" title="${absencesTexte}">${tronque}</span>`;
}