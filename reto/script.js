const formulario = document.getElementById("formulario");
const nombre = document.getElementById("nombre");
const examen1 = document.getElementById("certamen 1");
const examen2 = document.getElementById("certamen 2");
const examen3 = document.getElementById("certamen 3");
const Promedio = document.getElementById("promedio");
const resultado = document.getElementById("resultado");

// Calcular promedio automáticamente
[examen1, examen2, examen3].forEach(input => {
    input.addEventListener("input", () => {
        const e1 = parseFloat(examen1.value) || 0;
        const e2 = parseFloat(examen2.value) || 0;
        const e3 = parseFloat(examen3.value) || 0;
        Promedio.value = ((e1 + e2 + e3) / 3).toFixed(2);
    });
});

// Botón Guardar - Guardar datos en localStorage
formulario.addEventListener("submit", function(e){
    e.preventDefault();
    
    const usuario = {
        nombre: nombre.value,
        examen1: parseFloat(examen1.value) || 0,
        examen2: parseFloat(examen2.value) || 0,
        examen3: parseFloat(examen3.value) || 0,
        promedio: parseFloat(Promedio.value) || 0,
        fechaRegistro: new Date().toLocaleString()
    };

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    
    formulario.reset();
    Promedio.value = "";

    resultado.innerHTML = `
        <h2>USUARIO GUARDADO</h2>
        <p><strong>Nombre:</strong> ${usuario.nombre}</p>
        <p><strong>Certamen 1:</strong> ${usuario.examen1}</p>
        <p><strong>Certamen 2:</strong> ${usuario.examen2}</p>
        <p><strong>Certamen 3:</strong> ${usuario.examen3}</p>
        <p><strong>Promedio:</strong> ${usuario.promedio.toFixed(2)}</p>
        <p style="color: green; font-weight: bold;">✓ Datos guardados correctamente</p>
    `;
});

// Botón Ver Actividad - Consultar y mostrar todos los usuarios
const btnVerActividad = document.querySelector('button[type="button"]');
btnVerActividad.addEventListener("click", function(){
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    
    if(usuarios.length === 0){
        resultado.innerHTML = `
            <h2>NO HAY USUARIOS REGISTRADOS</h2>
            <p>No hay datos guardados en el sistema.</p>
        `;
    } else {
        let html = '';
        let sumaC1 = 0;
        let sumaC2 = 0;
        let sumaC3 = 0;
        let sumaPromedios = 0;
        let aprobados = 0;
        let reprobados = 0;
        
        // Calcular totales y mostrar cada estudiante
        usuarios.forEach((user, index) => {
            const c1 = parseFloat(user.examen1) || 0;
            const c2 = parseFloat(user.examen2) || 0;
            const c3 = parseFloat(user.examen3) || 0;
            const promedio = (c1 + c2 + c3) / 3;
            
            sumaC1 += c1;
            sumaC2 += c2;
            sumaC3 += c3;
            sumaPromedios += promedio;
            
            if(promedio >= 60) {
                aprobados++;
            } else {
                reprobados++;
            }
            
            html += `Nombre ${index + 1}: ${user.nombre}<br>`;
            html += `C1: ${c1}<br>`;
            html += `C2: ${c2}<br>`;
            html += `C3: ${c3}<br>`;
            html += `Promedio: ${promedio.toFixed(2)}<br><br>`;
        });
        
        // Calcular promedios del curso
        const promedioC1 = sumaC1 / usuarios.length;
        const promedioC2 = sumaC2 / usuarios.length;
        const promedioC3 = sumaC3 / usuarios.length;
        const promedioFinal = sumaPromedios / usuarios.length;
        
        // Agregar estadísticas del curso
        html += `Promedio del curso C1: ${promedioC1.toFixed(2)}<br>`;
        html += `Promedio del curso C2: ${promedioC2.toFixed(2)}<br>`;
        html += `Promedio del curso C3: ${promedioC3.toFixed(2)}<br>`;
        html += `Promedio Final Curso: ${promedioFinal.toFixed(2)}<br>`;
        html += `Aprobados: ${aprobados}<br>`;
        html += `Reprobados: ${reprobados}`;
        
        resultado.innerHTML = html;
    }
});