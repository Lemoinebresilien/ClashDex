function trouverType(carte) {
    const debut = String(carte.id).slice(0, 2);

    if (debut === "26") return "troop";
    if (debut === "27") return "building";
    if (debut === "28") return "spell";
    return "autre";
}
function filtrer(typeChoisi) {
    const cartes = document.querySelectorAll(".carte");

    cartes.forEach(carte => {
        if (typeChoisi === "all" || carte.dataset.type === typeChoisi) {
            carte.classList.remove("cachee");
        } else {
            carte.classList.add("cachee");
        }
    });
}
function creerCarte(carte, type) {
    const div = document.createElement("div");
    div.classList.add("carte");
    div.classList.add(carte.rarity);
    div.dataset.type = type;
    div.innerHTML = `
        <img src="${carte.iconUrls.medium}" alt="${carte.name}">
        <p>${carte.name}</p>
    `;
        div.addEventListener("click", function () {
        ouvrirFiche(carte);
    });
    return div;
}
// On demande les cartes à NOTRE fichier PHP (pas directement à Supercell)
fetch("api.php")
    .then(reponse => reponse.json())   // on transforme le texte en objet JS
    .then(donnees => {
        const grille = document.getElementById("grille");

        // On parcourt chaque carte de la liste "items"
        donnees.items.forEach(carte => {
            const div = creerCarte(carte, trouverType(carte));
            grille.appendChild(div);
        });

        donnees.supportItems.forEach(carte => {
            const div = creerCarte(carte, "tower");
            grille.appendChild(div);
        });
    });

const menu = document.getElementById("menu");
const burger = document.getElementById("nav-icon1");

menu.addEventListener("mouseenter", () => {
    menu.classList.add("open");
    burger.classList.add("open");
});

menu.addEventListener("mouseleave", () => {
    menu.classList.remove("open");
    burger.classList.remove("open");
});

const boutons = document.querySelectorAll("#sidebar button");

boutons.forEach(bouton => {
    bouton.addEventListener("click", () => {
        const typeChoisi = bouton.dataset.type;
        filtrer(typeChoisi);
    });
});
const fiche = document.querySelector("#fiche");

function ouvrirFiche(carte) {
    document.querySelector("#fiche-image").src = carte.iconUrls.medium;
    document.querySelector("#fiche-nom").textContent = carte.name;
    fiche.classList.remove("cachee");
}

function fermerFiche() {
    fiche.classList.add("cachee");
}

document.querySelector("#fiche-fermer").addEventListener("click", fermerFiche);

fiche.addEventListener("click", function (event) {
    if (event.target === fiche) {
        fermerFiche();
    }
});