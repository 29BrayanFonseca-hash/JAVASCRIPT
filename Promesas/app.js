const btnCargar = document.getElementById('btnCargar');
const estado = document.getElementById('estado');
const contenedor = document.getElementById('contenedorEstudiantes');
const errorDiv = document.getElementById('error');

async function cargarEStudiantes(){

    contenedor.innerHTML= '';
    estado.textContent = 'Cargando Estudiantes..';
    try {
        const respuesta = await fetch('./datos.json');
        
        if(!respuesta.ok){
            throw new Error (`Error al cargar el archivo(${respuesta.status})`);
        }

        const estudiantes = await respuesta.json();

        if (!Array.isArray(estudiantes) || estudiantes.length == 0){//
            throw new Error ('No hay estudiantes registrados o el formato es invalido');
        }

        estudiantes.forEach(est => {
            const tarjeta = document.createElement('div');
            tarjeta.className = 'tarjeta';

            const colorPromedio = //creando el promedio
                est.promedio >= 4.5 ? 'promedio-alto' : //?= parte verdadera, despues d elos piuntos va la falsa
                est.promedio >= 3.5 ? 'promedio-medio':
                'promedio-bajo';

            tarjeta.innerHTML = `
            <img src = "${est.foto}" alt = "${est.nombre}">
            <div class = "info">
                <h3>${est.nombre}</h3>
                <div class  = "promedio ${colorPromedio}">
                    ${est.promedio.toFixed(1)}
                </div>
                <div class = "carrera">${est.carrera}</div>
                <div class = "ciudad">${est.ciudad}</div>
                <div class = "edad"${est.edad}</div>
            </div>`;

            contenedor.appendChild(tarjeta);
        });
        estado.textContent = `Mostrando ${estudiantes.length}
        estudiantes`
    }catch(error){
        console.error('Error: ', error);

        errorDiv.textContent = `No se pudo cargar la lista: ${error.message}`;

        estado.textContent = 'Error al cargar !!';
        }
}
btnCargar.addEventListener('click', cargarEStudiantes);