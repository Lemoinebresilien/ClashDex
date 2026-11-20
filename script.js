// On demande les cartes à NOTRE fichier PHP (pas directement à Supercell)
fetch("api.php")
    .then(reponse => reponse.json())   // on transforme le texte en objet JS
    .then(donnees => {
        const grille = document.getElementById("grille");

        // On parcourt chaque carte de la liste "items"
        donnees.items.forEach(carte => {
            const div = document.createElement("div");
            div.classList.add("carte");
            div.classList.add(carte.rarity);
            div.innerHTML = `
                <img src="${carte.iconUrls.medium}" alt="${carte.name}">
                <p>${carte.name}</p>
            `;
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

