<?php
// Connexion à la base de données
$servername = "localhost";
$username = "Ibrahima";
$password = "Dieng123@";
$dbname = "gestion_repas";

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérification de la connexion
if ($conn->connect_error) {
    die("La connexion à la base de données a échoué : " . $conn->connect_error);
}

// Récupération des données du formulaire
$nomRepas = $_POST['nom'] ?? '';
$descriptionRepas = $_POST['description'] ?? '';
$categorieRepas = $_POST['categorie'] ?? '';

// Requête pour ajouter un repas
$sql = "INSERT INTO repas (nom, description, categorie) VALUES ('$nomRepas', '$descriptionRepas', '$categorieRepas')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(array('message' => 'Repas ajouté avec succès.'));
} else {
    echo json_encode(array('error' => 'Erreur lors de l\'ajout du repas : ' . $conn->error));
}

$conn->close();
?>
