const formulario = document.getElementById("formulario");
const nombre = document.getElementById("nombre");
const edad = document.getElementById("edad");
const ciudad = document.getElementById("ciudad");
const resultado = document.getElementById("resultado");

// Botón Guardar - Guardar datos en localStorage
formulario.addEventListener("submit", function(e){
    e.preventDefault();
    
    const usuario = {
        nombre: nombre.value,
        edad: edad.value,
        ciudad: ciudad.value,
        fechaRegistro: new Date().toLocaleString()
    };

    //primero convierte el texto Json DEVUELTA AL  OBJETO y busca datos guardados en el json
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    
    // Agrega el nuevo usuario al array
    usuarios.push(usuario);
    
    // Guardar array completo en localStorage
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // Limpiar formulario
    formulario.reset();
    
    // Mostrar mensaje de confirmación
    resultado.innerHTML = `
        <h2>USUARIO GUARDADO</h2>
        <p><strong>Nombre:</strong> ${usuario.nombre}</p>
        <p><strong>Edad:</strong> ${usuario.edad}</p>
        <p><strong>Ciudad:</strong> ${usuario.ciudad}</p>
        <p 
        style="color: green; 
        font-weight: bold;">
        ✓ Datos guardados correctamente</p>
    `;
});

// Botón Ver Actividad - Consultar y mostrar todos los usuarios
const btnVerActividad = document.querySelector('button[type="button"]');
btnVerActividad.addEventListener("click", function(){
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) ||[];//obtiene todos los usuarios guardados en local Storage
    
    if(usuarios.length === 0){
        resultado.innerHTML = `
            <h2>NO HAY USUARIOS REGISTRADOS</h2>
            <p>No hay datos guardados en el sistema.</p>
        `;
    } else {
        let html = `<h2>TOTAL DE USUARIOS: ${usuarios.length}</h2>`;
        
        usuarios.forEach((user, index) => {// resorre cada usuario en el array
            html += `
                <div style="background: #f9f9f9;
                padding: 15px;
                margin: 10px 0;
                border-radius: 8px;
                border-left: 4px solid #007bfc;">
                    <h3>Usuario #${index + 1}</h3>
                    <p><strong>Nombre:</strong> ${user.nombre}</p>
                    <p><strong>Edad:</strong> ${user.edad}</p>
                    <p><strong>Ciudad:</strong> ${user.ciudad}</p>
                    <p><strong>Fecha de registro:</strong> ${user.fechaRegistro}</p>
                </div>
            `;
        });
        //muestra todo el html geenrado en el div de resultado
        resultado.innerHTML = html;
    };
});