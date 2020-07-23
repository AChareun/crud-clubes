const reqDeleteClub = (event) => {
  if (event.target.classList.contains('delete-btn')) {
    const deleteRequest = new Request(`/club/${event.target.dataset.clubId}/delete`, { method: 'DELETE' });
    try {
      fetch(deleteRequest);
    } catch (error) {
      event.preventDefault();
    }

    window.location.href = '/club-list';
  }
};

const reqUpdateClub = (event) => {
  if (event.target.id === 'submit-update') {
    const { clubId } = event.target.dataset;

    const $FORM = document.getElementById('update-form');
    const formData = new FormData($FORM);
    formData.append('id', clubId);

    const init = { method: 'PUT', body: formData };
    const updateRequest = new Request(`/club-update/${clubId}`, init);

    try {
      fetch(updateRequest);
    } catch (error) {
      event.preventDefault();
    }

    window.location.href = `/club/${clubId}`;
  }
};

document.body.addEventListener('click', reqUpdateClub);
document.body.addEventListener('click', reqDeleteClub);
