const API_URL = "http://172.16.102.14:8080/api/usuarios";

const form = document.getElementById("usuario-form");
const tbody = document.getElementById("usuarios-tbody");
const fotoImput = document.getElementById("foto");

let fotoBase = "";

fotoImput.addEventListener("change", function(){
    const reader = new FileReader(); //objero para leer archivos

    reader.onload = function(){
        fotoBase64= reader.result.split(",")[1];
    };

    if(this.files[0]) reader.readAsDataURL(this.files[0]);
});

form.addEventListener("submit", async function(e){
    e.preventDefault();

    const usuario = {
        name: form.name.value,
        email: form.email.value,
        edad: form.edad.value,
        ciudad: form.edad.value,
        biografia: form.biografia.value,
        fotoBase64: fotoBase64
    };

    const id = document.getElementById("usuario-id").value;

    const method = id ? "PUT" : "POST";

    const url = id ? `${API_URL}/${id}` : API_URL;

    try {
        //peticion al servidor
        const res = await  fetch(url,{
            method: method,
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(usuario)
        });

        if(res.ok){
            form.reset();
            fotoBase64 = "";
            document.getElementById("usuario-id").value = "";
            loadUsuarios();
        }
    } catch(error){
        console.error("Error al guardar:",error);
        alert("error de conexion al servidor.");
    }
});

async function loadUsuarios(){
    try{
        const res = await fetch(API_URL);
        const usuarios = await res.json();

        renderTable(usuarios);
    }catch(error){
        console.error("Error al cargar usuarios:",error);
    }
}

function renderTable(usuarios){
    tbody.textContent = "";

    usuarios.forEach((u)=>{
        const tr = document.createElement("tr"); //nueva fila
        
        const tdUser = document.createElement("td");
        tdUser.className = "user-cell";

        const img = document.createElement("img");
        img.className = "user-avatar";

        
    })
        
    
}