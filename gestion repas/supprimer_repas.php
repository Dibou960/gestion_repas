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

// Récupération de l'ID du repas à supprimer depuis la requête POST
$idRepas = $_POST['id'] ?? '';

// Requête pour supprimer un repas
$sql = "DELETE FROM repas WHERE id = $idRepas";

if ($conn->query($sql) === TRUE) {
    echo json_encode(array('message' => 'Repas supprimé avec succès.'));
} else {
    echo json_encode(array('error' => 'Erreur lors de la suppression du repas : ' . $conn->error));
}

$conn->close();
?>
