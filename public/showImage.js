const fileInput = document.getElementById('image');

fileInput.addEventListener('change', (e) => {
    const dummy = document.getElementById('dummy');
    dummy.src = URL.createObjectURL(e.target.files[0]);
});