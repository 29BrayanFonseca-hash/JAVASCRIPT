const loginForm = document.getElementById("loginForm");
const loginBtn = document.getElementById("loginBtn");
const estado = document.getElementById("estado");
const resultado = document.getElementById("resultado");

const baseDatos = {
    usuario: "admin123",
    password: "Segura123!"
}

function validarUsuario(usuario){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(usuario.length < 4){
                reject("El usuario debe tener mas de 3 caracteres.");
            }else if (usuario !== baseDatos.usuario){
                reject("Usuario no encontrado");
            }else {
                resolve("Usuario no verificado");
            }
        },1500);
    });
}

function validarPassword (password){
    return new Promise ((resolve,reject)=>{
        setTimeout(()=>{
            const segura = password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[!@#$*]/.test(password);
            if (!segura){
                reject("La Contraseña debe tener almenos 8 caracteres, una MAYUSCULA y un caracter e$pecial");
            }else if (password !== baseDatos.password){
                reject("Contraseña incorrecta.")
            }else{
                resolve ("Contraseña Admitida");
            }
        },2000);
    });
}

loginForm.addEventListener("submit", (e)=>{
    e.preventDefault();

    resultado.textContent = "";
    resultado.className = "";
    estado.textContent = "";

    const usuario = document.getElementById ("usuario").value.trim();
    const password = document.getElementById("password").value.trim();
    if (!usuario || !password){
        resultado.className = "error";
        resultado.textContent = "Todos los campos son obligatorios. ";
        estado.textContent = "Por favor completa todos los campos. ";
        return;
    }

    estado.textContent = "verificando credenciales... ";

    Promise.all([
        validarUsuario(usuario),
        validarPassword(password)
    ]).then(([resUsuario,resPass])=>{
        resultado.className = "success";
        resultado.textContent = `✅${resUsuario}\n ✅${resPass}`;
        estado.textContent = "Inicio de sesion exitoso.";

        setTimeout(()=>{
            window.location.href = "bienvenida.html";
        },1000);
    }).catch((error)=>{
        resultado.className = "error";
        resultado.textContent = `❌${error}`;
        estado.textContent = "❌ Error! En el inicio de la sesion.";
    }).finally (()=>{
        console.warn("Proceso de autenticacion finalizado");
    })
})
