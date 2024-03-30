import { CodeStatutaire } from '../dictionaries/CodeStatutaire.js';
import { CodeIndex } from '../dictionaries/CodeIndex.js';

export function getCodeStatutaireDescription(codeStatutaire) {
    // index = 1er numéro
    // statutaire = 2ème numéro
    const index = codeStatutaire.toString().slice(0, 1);
    const statutaire = codeStatutaire.toString().slice(1, 2);

    return {
        index: CodeIndex[index],
        statutaire: CodeStatutaire[statutaire]
    };
}