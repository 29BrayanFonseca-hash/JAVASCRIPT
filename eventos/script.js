function showEvent(name, type, element) {
    // Mostrar log en el contenedor correspondiente
    const logDiv = element.querySelector('.log');
    const time = new Date().toLocaleTimeString();
    logDiv.innerHTML += `[${time}] ${name}<br>`;
    logDiv.scrollTop = logDiv.scrollHeight;


    // Mostrar toast visual
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = `Evento: ${name}`;
    document.getElementById('toastContainer').appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
  }


  // Drag & Drop
  function allowDrop(ev) {
    ev.preventDefault();
    showEvent("dragover", "drag", ev.currentTarget);
  }


  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }


  function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    ev.currentTarget.appendChild(document.getElementById(data));
    showEvent("drop", "drag", ev.currentTarget);
  }


  // Eventos de ventana
  window.addEventListener('resize', () => {
    showEvent('resize', 'window', document.getElementById('winlog').parentElement);
  });


  window.addEventListener('scroll', () => {
    showEvent('scroll', 'window', document.getElementById('winlog').parentElement);
  });
