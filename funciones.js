const updateFocus = (indexCuento)=> {
    document.querySelectorAll('.card').forEach(card => card.classList.remove('featured-card'));
    document.querySelectorAll('.card')[indexCuento].classList.add('featured-card');
    return indexCuento;
  }

  export {updateFocus};