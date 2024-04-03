import { PersonnelDataModel } from './models/PersonnelDataModel.js';
import { getMatriculeDescription } from './translators/Matricule.js';
import { RemunerationModel } from './models/RemunerationModel.js';
import { DetailTransactionModel } from './models/DetailTransactionModel.js';

export class PdfParser {
    constructor(fileArrayBuffer) {
        this.fileArrayBuffer = fileArrayBuffer;
    }

    async parse() {

        // Passer directement l'ArrayBuffer à getDocument.
        const pdf = await pdfjsLib.getDocument({ data: this.fileArrayBuffer }).promise;

        const pages = await this.getPages(pdf);

        // enlève la première page (page de garde)
        pages.shift();

        let textBrut = await this.getText(pages);
        let tableBruts = await this.getLines(textBrut);
        let membrePersonnelBruts = [];

        for (let tableBrut of tableBruts) {

            let keys = {
                header: [],
                table: []
            }
            const mdp = await this.getMembrePersonnelBrut(tableBrut);

            keys.header = await this.getMembrePersonnel(mdp);
            keys.table = await this.getColonnes(tableBrut);
            membrePersonnelBruts.push(keys);
        }

        return membrePersonnelBruts;
    }

    async getPages(pdf) {
        const pages = [];
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            pages.push(page);
        }
        return pages;
    }

    async getText(pages) {
        const pagesText = await Promise.all(pages.map(async (page) => {
            const textContent = await page.getTextContent();
            // Convertir le contenu textuel en un tableau de lignes
            const lines = textContent.items.map(item => item.str).join('\n').split('\n');
            // Enlever les 10 premières lignes de chaque page (correspond à en-tête))
            const trimmedLines = lines.slice(10);
            // Rejoindre les lignes restantes en une seule chaîne de texte
            return trimmedLines.join('\n');
        }));
        // Sépare le texte de chaque page par deux retours à la ligne
        return pagesText.join('\n\n');
    }

    async getLines(text) {
        let tables = [];
        let table = [];
        let lines = text.split('\n');
        let i = 0;
        for (let line of lines) {
            // si la ligne commence par "      _____" (fin de tableau )
            if (line.startsWith('      _____')) {
                tables.push(table);
                table = [];
            } else {
                table.push(line);
            }
        }
        return tables;
    }

    // todo: autre approche pour lastColonne: tous les x caractères puis trimer?
    async getColonnes(lignes) {

        let colonnesReturn = [];

        // 6 espaces + lettre 
        const regex = /^ {6}[a-zA-Z]/;

        for (let ligne of lignes) {

            if (regex.test(ligne)) {

                // on enlève les espaces en début de ligne
                ligne = ligne.replace(/^ +/, '');

                // On split les | pour avoir les colonnes
                const colonnes = ligne.split('|');
                const transaction = new DetailTransactionModel(...colonnes);

                // Remuneration
                // la dernière colonne de colonnes est spéciale, on la traite à part séparées par " "
                let lastColonneString = colonnes.pop();
                const remunerationData = await this.getRemuneration(lastColonneString);
                const remuneration = new RemunerationModel(...remunerationData);
                colonnesReturn.push({
                    'transaction': transaction,
                    'remuneration': remuneration
                });
            }
        }
        return colonnesReturn;
    }

    async getRemuneration(ligne) {
        // dans la string, si on a un moins suivi d'un chiffre, on ajoute une espace après le moins
        let lastColonneString = ligne.replace(/-(\d)/g, '- $1');

        // on enlève les espaces en début de ligne
        lastColonneString = lastColonneString.replace(/^ +/, '');

        // supprime les doubles espaces
        lastColonneString = lastColonneString.replace(/ {2,}/g, ' ');
        const data = lastColonneString.split(' ');

        return data;
    }

    async getMembrePersonnelBrut(table) {
        for (let ligne of table) {
            // renvoie uniquement la ligne qui commence par " " suivit d'un 1 ou d'un 2
            if (ligne.startsWith(' 1') || ligne.startsWith(' 2')) {
                return ligne;
            }
        }
        return null;
    }

    async getMembrePersonnel(line) {

        line = line.trim();

        let membrePersonnelParts = line.split(',').map(part => part.trim());
        let firstPartElements = membrePersonnelParts.shift().split(' ');

        // Le matricule est composé des 3 premiers éléments
        let matricule = firstPartElements.slice(0, 3).join(' ');
        let matriculeDescription = getMatriculeDescription(matricule);

        let nomPrenom = firstPartElements.slice(3).join(' ');
        let numeroCompte = membrePersonnelParts.shift();
        let adresse = membrePersonnelParts.shift();
        let codePostalVille = membrePersonnelParts.shift();

        let [codePostal, ville] = codePostalVille ? [codePostalVille.slice(0, 4), codePostalVille.slice(4).trim()] : [null, null];

        codePostal = codePostal && codePostal.trim() ? codePostal : null;
        ville = ville && ville.trim() ? ville : null;

        return new PersonnelDataModel(matriculeDescription, nomPrenom, numeroCompte, adresse, codePostal, ville);
    }
}
