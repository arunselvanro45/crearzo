document.addEventListener('DOMContentLoaded', () => {

  document.getElementById('year').textContent = new Date().getFullYear();

  const grid = document.getElementById('portfolioGrid');
  const search = document.getElementById('portfolioSearch');

  function render(projects) {
    grid.innerHTML = '';
    projects.forEach(p => {
      const card = document.createElement('div');
      card.className = 'portfolio-card';
      card.innerHTML = `<img src="${p.image}" alt="${p.title}">`;
      grid.appendChild(card);
    });
  }

  render(portfolioProjects);

  search.addEventListener('input', e => {
    const q = e.target.value.toLowerCase();
    render(
      portfolioProjects.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      )
    );
  });

});
