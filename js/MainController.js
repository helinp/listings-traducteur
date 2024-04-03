import { PdfParser } from './PdfParser.js'; // Assurez-vous que le nom du fichier importé correspond
import { injectSelectMdp } from './ShowData.js'; // Assurez-vous que le nom du fichier importé correspond
import { showHeader, showTable, showCalculDimona} from './ShowData.js'; // Assurez-vous que le nom du fichier importé correspond

console.log('Initialisation du contrôleur principal');

// Sélecteur de fichier PDF
const fileInput = document.getElementById('pdf-file');
// Bouton d'importation
const importButton = document.getElementById('import-btn');

var dataGlobal = [];

// Fonction pour lire le fichier PDF
async function readPdfFile(file) {
    try {
        const reader = new FileReader();

        reader.onload = async (event) => {
            try {
                // Parse les données PDF
                const arrayBuffer = event.target.result;
                const parser = new PdfParser(arrayBuffer);
                const data = await parser.parse();

                dataGlobal = data;

                // Logique de traitement des données
                injectSelectMdp(data);

            } catch (error) {
                handleError('Erreur lors du parsing du PDF', error);
            }
        };

        reader.onerror = () => handleError('Erreur de lecture du fichier');
        reader.readAsArrayBuffer(file);

    } catch (error) {
        handleError('Erreur lors de la lecture du fichier PDF', error);
    }
}

function handleError(message, error = null) {
    console.error(message, error);
}

// Vérification que les éléments existent avant d'ajouter des événements
if (fileInput && importButton) {
    importButton.addEventListener('click', () => {
        console.log('Import du fichier PDF');
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            readPdfFile(file); // Appel de la fonction pour lire le fichier
        } else {
            console.log('Aucun fichier sélectionné');
        }
    });
} else {
    console.error('Erreur : les éléments d\'importation du PDF ne sont pas trouvés dans le DOM.');
}

// listenner si select-mdp sélectionné
document.querySelector('#select-mdp').addEventListener('change', (event) => {
    const index = event.target.value;
    showHeader(dataGlobal, index);
    showTable(dataGlobal, index);
    showCalculDimona(dataGlobal, index);

    document.querySelector('#div-data-mdp').classList.remove('hidden');
});

