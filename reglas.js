document.getElementById("cuestionario").addEventListener("submit", function(event) {
    event.preventDefault();

    // Evaluar las respuestas
    let respuestas = {
        q1: document.querySelector('input[name="q1"]:checked')?.value,
        q2: document.querySelector('input[name="q2"]:checked')?.value,
        q3: document.querySelector('input[name="q3"]:checked')?.value,
        q4: document.querySelector('input[name="q4"]:checked')?.value,
        // Agregar las demás preguntas aquí...
    };

    // Comprobar si las respuestas indican un riesgo de autismo
    let necesitaConsulta = false;
    Object.values(respuestas).forEach(respuesta => {
        if (respuesta === "Sí") {
            necesitaConsulta = true;
        }
    });

    // Mostrar el resultado
    let mensaje = necesitaConsulta ? 
        "Se recomienda realizar una consulta con un psicólogo." : 
        "No parece ser necesario realizar una consulta con un psicólogo por ahora.";

    document.getElementById("mensaje").textContent = mensaje;
    document.getElementById("resultado").style.display = "block";

    // Función para generar el archivo Word
    document.getElementById("generar-word").addEventListener("click", function() {
        generarWord(respuestas, mensaje);
    });
});

function generarWord(respuestas, mensaje) {
    const doc = new docx.Document({
        sections: [
            {
                properties: {},
                children: [
                    new docx.Paragraph({
                        children: [
                            new docx.TextRun("Informe de Detección de Autismo\n\n"),
                            new docx.TextRun("Respuestas del Cuestionario:\n")
                        ]
                    }),
                    // Agregar respuestas aquí
                    ...Object.entries(respuestas).map(([pregunta, respuesta]) => {
                        return new docx.Paragraph({
                            children: [new docx.TextRun(`${pregunta}: ${respuesta}\n`)]
                        });
                    }),
                    new docx.Paragraph({
                        children: [
                            new docx.TextRun("\nConclusión:\n"),
                            new docx.TextRun(mensaje)
                        ]
                    })
                ]
            }
        ]
    });

    // Guardar el archivo
    docx.Packer.toBlob(doc).then(blob => {
        saveAs(blob, "Informe_Autismo.docx");
    });
}
