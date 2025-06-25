let resolvePromise;

function showAlert(message) {
    return new Promise((resolve) => {
        const toast = document.getElementById('custom-toast');
        const messageEl = document.getElementById('toast-message');
        const confirmBtn = document.getElementById('toast-confirm');
        const cancelBtn = document.getElementById('toast-cancel');

        messageEl.innerHTML = `<strong>TravaJogo</strong><br>${message}`;
        
        confirmBtn.style.display = 'none';
        cancelBtn.style.display = 'none';
        toast.style.display = 'block';

        setTimeout(() => {
            toast.style.display = 'none';
            resolve(true);
        }, 3000);
    });
}

function showConfirm(message) {
    return new Promise((resolve) => {
        const toast = document.getElementById('custom-toast');
        const messageEl = document.getElementById('toast-message');
        const confirmBtn = document.getElementById('toast-confirm');
        const cancelBtn = document.getElementById('toast-cancel');

        messageEl.innerHTML = `<strong>TravaJogo</strong><br>${message}`;
        confirmBtn.style.display = 'inline-block';
        cancelBtn.style.display = 'inline-block';
        toast.style.display = 'block';

        const confirmHandler = () => {
            toast.style.display = 'none';
            resolve(true);
            confirmBtn.removeEventListener('click', confirmHandler);
            cancelBtn.removeEventListener('click', cancelHandler);
        };

        const cancelHandler = () => {
            toast.style.display = 'none';
            resolve(false);
            confirmBtn.removeEventListener('click', confirmHandler);
            cancelBtn.removeEventListener('click', cancelHandler);
        };

        confirmBtn.addEventListener('click', confirmHandler);
        cancelBtn.addEventListener('click', cancelHandler);

        setTimeout(() => {
            toast.style.display = 'none';
        }, 5000);
    });
}