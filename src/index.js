const stars = document.querySelectorAll('.star');

function setRating(rating) {
  localStorage.setItem('recipeRating', rating);
}

const savedRating = localStorage.getItem('recipeRating');
if (savedRating) {
  stars.forEach(star => {
    if (star.getAttribute('data-value') == savedRating) {
      star.classList.add('active');
    }
  });
}

stars.forEach(star => {
  star.addEventListener('click', () => {
    const rating = star.getAttribute('data-value');
    setRating(rating);
    stars.forEach(s => {
      if (s.getAttribute('data-value') <= rating) {
        s.classList.add('active');
      } else {
        s.classList.remove('active');
      }
    });
  });
});