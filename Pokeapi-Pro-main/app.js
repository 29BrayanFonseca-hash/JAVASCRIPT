const container = document.getElementById("cards-container");
const details = document.getElementById("details");
const searchInput = document.getElementById("search-input");

let allPokemon = []; // Para almacenar los datos y filtrar localmente

const typeColors = {
  fire: 'var(--fire)', water: 'var(--water)', grass: 'var(--grass)',
  electric: 'var(--electric)', ice: 'var(--ice)', fighting: 'var(--fighting)',
  poison: 'var(--poison)', ground: 'var(--ground)', flying: 'var(--flying)',
  psychic: 'var(--psychic)', bug: 'var(--bug)', rock: 'var(--rock)',
  ghost: 'var(--ghost)', dragon: 'var(--dragon)', dark: 'var(--dark-type)',
  steel: 'var(--steel)', fairy: 'var(--fairy)', normal: 'var(--normal)'
};

async function init() {
  try {
    // 1. Cargamos la lista inicial
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    const data = await response.json();

    // 2. Cargamos todos los detalles en paralelo para mejor rendimiento
    const detailPromises = data.results.map(p => fetch(p.url).then(res => res.json()));
    allPokemon = await Promise.all(detailPromises);

    renderCards(allPokemon);
  } catch (error) {
    container.innerHTML = `<p class="error">Error al cargar datos: ${error.message}</p>`;
  }
}

function renderCards(list) {
  container.innerHTML = "";
  list.forEach(pokemon => {
    const card = document.createElement("div");
    card.classList.add("card");
    const mainType = pokemon.types[0].type.name;
    
    // En app.js dentro de renderCards:
    card.innerHTML = `
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" loading="lazy">
    <p style="color: #aaa; font-size: 0.8rem">N.º ${pokemon.id.toString().padStart(3, '0')}</p>
    <h3>${pokemon.name.toUpperCase()}</h3>
    `;

    card.addEventListener("click", () => showDetails(pokemon));
    container.appendChild(card);
  });
}

function showDetails(pokemon) {
  const mainType = pokemon.types[0].type.name;
  const color = typeColors[mainType] || '#777';

  // Generar HTML de tipos
  const typesHTML = pokemon.types.map(t => 
    `<span class="type-badge" style="background-color: ${typeColors[t.type.name]}">${t.type.name}</span>`
  ).join("");

  // Generar HTML de estadísticas
  const statsHTML = pokemon.stats.map(s => `
    <div class="stat-row">
      <div style="display: flex; justify-content: space-between; font-size: 0.8rem">
        <span>${s.stat.name.toUpperCase()}</span>
        <span>${s.base_stat}</span>
      </div>
      <div class="stat-bar-bg">
        <div class="stat-bar-fill" style="width: ${Math.min(s.base_stat, 100)}%; background: ${color}"></div>
      </div>
    </div>
  `).join("");

  details.style.borderRightColor = color;
  details.innerHTML = `
    <h2 style="color: ${color}">#${pokemon.id} ${pokemon.name.toUpperCase()}</h2>
    <img class="pokemon-image" src="${pokemon.sprites.other['official-artwork'].front_default}">
    <div class="types">${typesHTML}</div>
    
    <div style="display: flex; gap: 20px; margin: 10px 0;">
       <div><strong>Peso:</strong> ${pokemon.weight / 10}kg</div>
       <div><strong>Altura:</strong> ${pokemon.height / 10}m</div>
    </div>

    <div class="stats-container">
      <h3 style="border-bottom: 2px solid ${color}; padding-bottom: 5px">Estadísticas Base</h3>
      ${statsHTML}
    </div>
  `;
  
  // Scroll hacia arriba en móviles al seleccionar
  if(window.innerWidth < 850) details.scrollIntoView({behavior: 'smooth'});
}

// Lógica del buscador
searchInput.addEventListener("input", (e) => {
  const term = e.target.value.toLowerCase();
  const filtered = allPokemon.filter(p => 
    p.name.includes(term) || p.id.toString() === term
  );
  renderCards(filtered);
});

init();