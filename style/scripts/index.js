// DOM Elements
const container = document.getElementById('dog-container');
const breedSelect = document.getElementById('breed-select');
const toggleBtn = document.getElementById('theme-toggle');
const searchInput = document.getElementById('breed-search');
const searchBtn = document.getElementById('search-btn');

// Toggle light/dark mode
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});
// Event listener for search button
searchBtn.addEventListener('click', () => {
  const searchValue = searchInput.value.toLowerCase().trim();
  const options = Array.from(breedSelect.options);
  const found = options.find(opt => opt.value.toLowerCase() === searchValue);

  if (found) {
    breedSelect.value = found.value;
    fetchDogs(found.value);
  } else {
    alert(`Breed "${searchValue}" not found. Please try again.`);
  }
});


// Fetch all breeds and populate the dropdown
async function fetchBreeds() {
  try {
    const res = await fetch('https://dog.ceo/api/breeds/list/all');
    const data = await res.json();
    const breeds = Object.keys(data.message);
    populateBreedSelect(breeds);
  } catch (error) {
    console.error('Failed to fetch breeds:', error);
  }
}

// Populate breed dropdown
function populateBreedSelect(breeds) {
  breedSelect.innerHTML = breeds
    .map(breed => `<option value="${breed}">${breed}</option>`)
    .join('');
}

// Fetch and display 6 random dogs of the selected breed
async function fetchDogs(breed = 'husky') {
  try {
    const res = await fetch(`https://dog.ceo/api/breed/${breed}/images/random/6`);
    const data = await res.json();
    renderDogs(data.message);
  } catch (error) {
    console.error('Failed to fetch dogs:', error);
  }
}

// Render dog cards
function renderDogs(images) {
  container.innerHTML = images
    .map(url => `
      <div class="dog-card">
        <img src="${url}" alt="Cute dog">
        <button class="like-btn">❤️</button>
      </div>
    `)
    .join('');
}

// Breed select change event
breedSelect.addEventListener('change', e => {
  fetchDogs(e.target.value);
});

// Like button click event (event delegation)
container.addEventListener('click', e => {
  if (e.target.classList.contains('like-btn')) {
    e.target.classList.toggle('liked');
  }
});

// Initial load
fetchBreeds();
fetchDogs();
function renderDogs(images) {
  const selectedBreed = breedSelect.value;
  container.innerHTML = images
    .map(url => `
      <div class="dog-card">
        <img src="${url}" alt="Dog image of ${selectedBreed}">
        <div class="card-body">
          <h3>${capitalizeBreed(selectedBreed)}</h3>
          <button class="like-btn">❤️</button>
        </div>
      </div>
    `)
    .join('');
}

// Utility function to capitalize breed name
function capitalizeBreed(breed) {
  return breed
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

