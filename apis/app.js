const API_URL = "http://172.16.102.14:8080/api/usuarios";
const form = document.getElementById("usuario-form");
const tbody = document.getElementById("usuarios-tbody");
const fotoInput = document.getElementById("foto");
let fotoBase64 = "";
fotoInput.addEventListener("change", function(){
    const reader = new FileReader(); //Objeto para leer archivos
    reader.onload = function(){
        fotoBase64 = reader.result.split(",")[1];
    };
    if(this.files[0]) reader.readAsDataURL(this.files[0]);
});
form.addEventListener("submit", async function(e){
    e.preventDefault();
    const usuario = {
        name: form.name.value,
        email: form.email.value,
        edad: form.edad.value,
        ciudad: form.ciudad.value,
        biografia: form.biografia.value,
        fotoBase64: fotoBase64
    };
    const id = document.getElementById("usuario-id").value;
    const method = id ? "PUT" : "POST";
    const url = id ? `${API_URL}/${id}` : API_URL;
    try{
        //Peticion al servidor
        const res = await fetch(url,{
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
        console.error("Error al guardar:", error);
        alert("Error de Conexion al Servidor 😞");
    }
});
async function loadUsuarios(){
    try{
        const res = await fetch(API_URL);
        const usuarios = await res.json();
        renderTable(usuarios);
    } catch(error){
        console.error("Error al cargar usuarios 😞:", error);
    }
}
function renderTable(usuarios){
    console.log(usuarios);
    tbody.textContent = "";
    usuarios.forEach((u)=>{
        const tr = document.createElement("tr"); //Nueva Fila
        const tdUser = document.createElement("td");
        tdUser.className = "user-cell";
        const img = document.createElement("img");
        img.className = "user-avatar";
        img.src = u.fotoBase64 ? `data:image/png;base64, ${u.fotoBase64}` : "https://ui-avatars.com/api/?name="+encodeURIComponent(u.name)+"&background=random";
        const infoDiv = document.createElement("div");
        infoDiv.className = "user-info";
        const nameStrong = document.createElement("strong");
        nameStrong.textContent = u.name;
        const emailSpan = document.createElement("span");
        emailSpan.textContent = u.email;
        infoDiv.append(nameStrong,emailSpan);
        tdUser.append(img,infoDiv);
        tr.appendChild(tdUser);
        //Ubicacion y Edad
        const tdLocation = document.createElement("td");
        const cityStrong = document.createElement("strong");
        cityStrong.textContent = u.ciudad || "No Definida";
        const ageSpan = document.createElement("td");
        ageSpan.style.display = "block";
        ageSpan.style.fontSize = "0.8rem";
        ageSpan.style.color = "var(--text-muted)";
        ageSpan.textContent = u.edad ? `${u.edad} años`:"";
        tdLocation.append(cityStrong, ageSpan);
        tr.append(tdLocation);
        //Biografia
        const tdBio = document.createElement("td");
        const bioText = u.biografia || "Sin biografia";
        tdBio.textContent = bioText.length > 50 ? bioText.substring(0, 50)+"..." :
        bioText;
        tr.appendChild(tdBio);
        //ACCIONES
        const tdActions = document.createElement("td");
        tdActions. className = "actions";

        const btnEdit = document.createElement("td");
        btnEdit.textContent = "edit";

        const btnDel = document.createElement("td");
        btnDel.textContent = "delete";

        tdActions.append(btnEdit, btnDel);
        tr.appendChild(tdActions);

        tbody.appendChild(tr)
        
    });
}
window.onload = loadUsuarios;