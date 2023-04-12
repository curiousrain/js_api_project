const stars = document.querySelectorAll('.star');
function setRating(rating) {
  // нужно будет доделать сохранение рейтинга
  console.log(`Рейтинг установлен: ${rating}`);
}
stars.forEach(star => {
  star.addEventListener('click', () => {
    const rating = star.getAttribute('data-value');
    setRating(rating);
  });
});