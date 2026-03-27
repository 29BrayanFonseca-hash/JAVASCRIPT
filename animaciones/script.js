const input = document.getElementById('nueva-tarea');
const btnAgregar = document.getElementById('agregar-btn');
const lista = document.getElementById('lista-tareas');
const mensajeError = document.getElementById('mensaje-error');
const totalSpan = document.getElementById('total');
const completadasSpan = document.getElementById('completadas');
btnAgregar.addEventListener('click',agregarTarea);
function agregarTarea(){
    const texto = input.value.trim();
    if (!texto || tareaExiste(texto)){
        mensajeError.classList.remove('oculto');
        mensajeError.animate([
            {transform: 'translateX(0)'},
            {transform: 'translateX(10px)'},
            {transform: 'translateX(-10px)'},
            {transform: 'translateX(0)'}
        ],{
            duration: 300,
            iterations: 2
        });
        return
    }
    mensajeError.classList.add('oculto');
    const li = document.createElement('li');
    li.classList.add('tarea');
    li.innerHTML = DOMPurify.sanitize(`
        <span>${texto}</span>
        <div class="botones">
            <button class="btn btn-completar">Completar</button>
            <button class="btn btn-eliminar">Eliminar</button>
        </div>`);
    lista.prepend(li);
    input.value = '';
    li.animate([
        {opacity:0, transform: 'translateY(-20px)'},
        {opacity:1, transform: 'translateY(0)'}
    ],{
        duration: 400,
        easing: 'ease-out'
    });
    const btnCompletar = li.querySelector('.btn-completar');
    const btnEliminar = li.querySelector('.btn-eliminar');
    btnCompletar.addEventListener('click', ()=> toggleCompletado(li));
    btnEliminar.addEventListener('click', ()=> eliminarTarea(li));
    actualizarContadores();
}
function tareaExiste(texto){
    const tareas = lista.querySelectorAll('li span');
    return Array.from(tareas).some(
        el => el.textContent.toLowerCase() === texto.toLowerCase()
    );
}
function toggleCompletado(tarea){
    tarea.classList.toggle('completada')
    tarea.animate([
        {transform: 'scale(1)'},
        {transform: 'scale(1.02)'},
        {transform: 'scale(1)'},
    ],
    {duration: 200})
    actualizarContadores();
}
function eliminarTarea(tarea){
    const animacionSalida = tarea.animate([
        {transform: 'scale(1)'},
        {transform: 'scale(0.5)'},
        {transform: 'scale(0)'},
    ],
    {duration: 200})
    animacionSalida.finished.then(() =>{
        tarea.remove()
        actualizarContadores();
    })
}
function actualizarContadores(){
    const total = lista.children.length;
    const completadas = Array.from(lista.children).filter(li => li.classList.contains('completada')).length;
    totalSpan.textContent = total;
    completadasSpan.textContent = completadas;
}