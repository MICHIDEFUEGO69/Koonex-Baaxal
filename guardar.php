<?php
// Configuración de la conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "cuestionario_autismo";

// Conectar a la base de datos
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Capturar las respuestas del formulario
$respuestas = [
    // Sección 1
    ["Sección 1", "¿El niño evita o no mantiene contacto visual con otras personas?", $_POST['pregunta1']],
    ["Sección 1", "¿El niño tiene dificultades para responder a su nombre, especialmente cuando se le llama en voz alta?", $_POST['pregunta2']],
    ["Sección 1", "¿El niño muestra una falta de interés en juegos de imitación o juego simbólico?", $_POST['pregunta3']],
    ["Sección 1", "¿El niño tiene dificultades para comprender o usar gestos como señalar, saludar o despedirse?", $_POST['pregunta4']],
    ["Sección 1", "¿El niño prefiere jugar solo y evita el contacto con otros niños?", $_POST['pregunta5']],
    ["Sección 1", "¿El niño tiene dificultades para iniciar o mantener una conversación?", $_POST['pregunta6']],
    ["Sección 1", "¿El niño muestra una preferencia por rutinas fijas y puede sentirse molesto si estas cambian?", $_POST['pregunta7']],

    // Sección 2
    ["Sección 2", "¿El niño realiza movimientos repetitivos, como balancearse, aplaudir o girar objetos?", $_POST['pregunta8']],
    ["Sección 2", "¿El niño se enfoca de manera excesiva en partes específicas de objetos (por ejemplo, ruedas de un coche, o las etiquetas de la ropa)?", $_POST['pregunta9']],
    ["Sección 2", "¿El niño muestra un interés intensamente limitado en ciertos temas o actividades (por ejemplo, obsesión por ciertos juguetes o actividades)?", $_POST['pregunta10']],
    ["Sección 2", "¿El niño tiene dificultades para comprender o usar el lenguaje de manera apropiada para su edad?", $_POST['pregunta11']],
    ["Sección 2", "¿El niño muestra una tendencia a repetir ciertas palabras o frases fuera de contexto?", $_POST['pregunta12']],

    // Sección 3
    ["Sección 3", "¿El niño muestra hipersensibilidad o hiposensibilidad a estímulos sensoriales, como ruidos fuertes, luces brillantes o texturas?", $_POST['pregunta13']],
    ["Sección 3", "¿El niño reacciona de manera exagerada o inapropiada a situaciones emocionales o estresantes (por ejemplo, gritos, llanto sin motivo aparente)?", $_POST['pregunta14']],
    ["Sección 3", "¿El niño tiene patrones inusuales de sueño, como dormir demasiado o muy poco?", $_POST['pregunta15']],

    // Sección 4
    ["Sección 4", "¿El niño presenta dificultades con habilidades motoras gruesas o finas, como gatear, caminar o utilizar utensilios?", $_POST['pregunta16']],
    ["Sección 4", "¿El niño muestra falta de coordinación motora, como caídas frecuentes o movimientos torpes?", $_POST['pregunta17']],
];

// Insertar las respuestas en la base de datos
foreach ($respuestas as $respuesta) {
    $seccion = $respuesta[0];
    $pregunta = $respuesta[1];
    $respuesta_texto = $respuesta[2];

    $sql = "INSERT INTO respuestas (seccion, pregunta, respuesta) VALUES ('$seccion', '$pregunta', '$respuesta_texto')";
    if (!$conn->query($sql)) {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
echo "Respuestas guardadas con éxito.";
?>
