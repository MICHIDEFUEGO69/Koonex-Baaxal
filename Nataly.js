document.getElementById("cuestionario").addEventListener("submit", function(e) {
    e.preventDefault();

    let preguntas = [
        "¿El niño evita o no mantiene contacto visual con otras personas?",
        "¿El niño tiene dificultades para responder a su nombre, especialmente cuando se le llama en voz alta?",
        "¿El niño muestra una falta de interés en juegos de imitación o juego simbólico?",
        "¿El niño tiene dificultades para comprender o usar gestos como señalar, saludar o despedirse?",
        "¿El niño prefiere jugar solo y evita el contacto con otros niños?",
        "¿El niño tiene dificultades para iniciar o mantener una conversación?",
        "¿El niño muestra una preferencia por rutinas fijas y puede sentirse molesto si estas cambian?",
        "¿El niño realiza movimientos repetitivos, como balancearse, aplaudir o girar objetos?",
        "¿El niño se enfoca de manera excesiva en partes específicas de objetos?",
        "¿El niño muestra un interés intensamente limitado en ciertos temas o actividades?",
        "¿El niño tiene dificultades para comprender o usar el lenguaje de manera apropiada?",
        "¿El niño muestra una tendencia a repetir ciertas palabras o frases fuera de contexto?",
        "¿El niño muestra hipersensibilidad o hiposensibilidad a estímulos sensoriales?",
        "¿El niño reacciona de manera exagerada o inapropiada a situaciones emocionales?",
        "¿El niño tiene patrones inusuales de sueño?",
        "¿El niño presenta dificultades con habilidades motoras gruesas o finas?",
        "¿El niño muestra falta de coordinación motora?",
        "¿El niño tiene dificultad para realizar actividades que requieran coordinación de ambas manos, como abotonarse la ropa o atarse los zapatos?",
        "¿El niño evita actividades físicas que requieran equilibrio, como correr, saltar o montar en bicicleta?"
    ];

    let respuestas = preguntas.map((pregunta, index) => {
        let respuesta = document.querySelector(`input[name="q${index + 1}"]:checked`);
        return {
            pregunta,
            respuesta: respuesta ? respuesta.value : null
        };
    });

    let respuestasIncompletas = respuestas.some(r => r.respuesta === null);
    if (respuestasIncompletas) {
        alert("Por favor, complete todas las preguntas.");
        return;
    }

    let señalesPreocupantes = respuestas.filter(r => r.respuesta === "Sí").length;
    let recomendacion = señalesPreocupantes > 5 
        ? "Recomendación: Se sugiere agendar una cita con un psicólogo para una evaluación más detallada."
        : "Recomendación: No parece ser necesario agendar una cita en este momento. Observe al niño y busque orientación si surgen más preocupaciones.";

    const { jsPDF } = window.jspdf;
    let doc = new jsPDF();

    doc.setFontSize(10);
    doc.text("Reporte de Encuesta", 20, 20);
    doc.setFontSize(10);

    let y = 30;
    respuestas.forEach((respuesta, index) => {
        let preguntaFormateada = doc.splitTextToSize(`${index + 1}. ${respuesta.pregunta}`, 180);
        doc.text(preguntaFormateada, 20, y);
        y += preguntaFormateada.length * 5;
        doc.text(`Respuesta: ${respuesta.respuesta}`, 20, y);
        y += 10;
    });

    doc.text("----------------------------------------------------", 20, y);
    y += 10;
    
    let recomendacionFormateada = doc.splitTextToSize(recomendacion, 180);
    doc.text(recomendacionFormateada, 20, y);

    // Asegurar que el mensaje se muestra en la web también
    document.getElementById("resultado").style.display = "block";
    document.getElementById("resultado").innerText = recomendacion;

    doc.save("reporte_encuesta.pdf");
});
