const input = document.getElementById("inputNotas");/*Asi se agrega un id en html para que sea funcional*/ 
const salida = document.getElementById("salida");
function evaluarNota(nota){
    if (nota >= 70){
        console.log(nota)
        return "Aprobado"
    }else{
        return "reprobado"
    }
}

(function() {
    window.ejecutar = function (){
        let notas = input.value.split(",").map(n => parseInt(n.trim()));
        /*El trim quita espaciados y bordes */
        /* El ".map(n => parseInt(n.trim())" es un llamado del metodo */ 
        /* el split sirve para que reconozca la estructura separada por las comas*/
        /*el value sirve para saber el campo"*/
        salida.innerHTML = ""; /* Es para ajustar el texto */ 

        for(let i = 0; i<notas.length; i++){/* Esta formando una lista de notas*/
            let resultado= evaluarNota(notas[i])
            let clase = resultado === "Aprobado" ? "aprobado": "reprobado"; /* ? = Entonces, : = Sino*/

            salida.innerHTML +=`
            <div class="${clase}">
                ${notas[i]} --> ${resultado}
            </div>`;
        }

        let i = 0;
        let aprobados = 0;
        while(i<notas.length){
            if(notas[i] >= 70){
                aprobados++;
            }
            i++;
        }

        salida.innerHTML += `<div class="total">Aprobado: ${aprobados}</div>`
    }
})();