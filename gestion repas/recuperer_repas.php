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

// Requête pour récupérer les repas
$sql = "SELECT id, nom, description, categorie FROM repas";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $repas = array();
    while($row = $result->fetch_assoc()) {
        $repas[] = $row;
    }
    // Convertir en JSON et afficher
    echo json_encode($repas);
} else {
    echo "0 résultats";
}

$conn->close();
?>
