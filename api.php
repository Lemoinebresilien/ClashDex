<?php
$token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjlhMmUxNGJkLTFhYjctNDQxNi1hZjNhLWU4YzQ4NDc4NjNlNiIsImlhdCI6MTc5NDQwNDkxOSwic3ViIjoiZGV2ZWxvcGVyLzBhYTJiMTgyLTQxOTctNDhmNS05ZGM3LTg4ODE2ZmExNGJjYSIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI0NS43OS4yMTguNzkiXSwidHlwZSI6ImNsaWVudCJ9XX0.MjxtdRku8aNn0yvfoPPY-Eg3mJAoEKaBboSa8w39i6khn2tIV3YQLYzH74n9L_rel7q1kCtlc_ovZFwrdfR3-A";

// On prépare la demande : "donne-moi la liste des cartes"
$ch = curl_init("https://proxy.royaleapi.dev/v1/cards");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ["Authorization: Bearer $token"]);

// On envoie la demande et on récupère la réponse
$reponse = curl_exec($ch);

// Si la requête a échoué, on affiche l'erreur de cURL
if ($reponse === false) {
    echo "Erreur cURL : " . curl_error($ch);
    exit;
}

// Le code renvoyé par Supercell (200 = OK, 403 = clé refusée...)
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

header("Content-Type: application/json");
echo $reponse;
