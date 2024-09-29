document.addEventListener('DOMContentLoaded', () => {
    const linkForm = document.getElementById('linkForm');
    const inputText = document.getElementById('inputText');
    const generatedLink = document.getElementById('generatedLink');
    const linkOutput = document.getElementById('linkOutput');
    const notificationBar = document.getElementById('notificationBar');
    const progressLine = document.getElementById('progressLine');
    const manualCopyContainer = document.getElementById('manualCopyContainer');
    const manualCopyButton = document.getElementById('manualCopyButton');
    const copyModal = document.getElementById('copyModal');
    const closeModal = document.getElementById('closeModal');
    
    linkForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const textToEncode = encodeURIComponent(inputText.value.trim());
        const generatedUrl = `${window.location.origin}/copy?text=${textToEncode}`;
        linkOutput.href = generatedUrl;
        linkOutput.textContent = generatedUrl;
        generatedLink.classList.remove('hidden');
    });

    function copyTextFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        const text = urlParams.get('text');
        if (text) {
            const decodedText = decodeURIComponent(text);
            navigator.clipboard.writeText(decodedText).then(() => {
                showModal('Text copied successfully!');
            }).catch(() => {
                showNotification('Failed to copy text. Please copy manually.');
                manualCopyContainer.style.display = 'flex';
            });
        }
    }

    function showNotification(message) {
        notificationBar.querySelector('#notificationText').textContent = message;
        notificationBar.style.display = 'block';
        progressLine.style.transform = 'translateX(0)';
        setTimeout(() => {
            progressLine.style.transform = 'translateX(-100%)';
            notificationBar.style.display = 'none';
        }, 3000);
    }

    function showModal(message) {
        document.getElementById('copyMessage').textContent = message;
        copyModal.style.display = 'flex';
    }

    closeModal.addEventListener('click', () => {
        copyModal.style.display = 'none';
    });

    manualCopyButton.addEventListener('click', () => {
        const linkText = linkOutput.textContent;
        navigator.clipboard.writeText(linkText).then(() => {
            showModal('Link copied manually!');
        }).catch((err) => {
            alert(`Failed to copy: ${err.message}`);
        });
    });

    if (window.location.pathname === '/copy') {
        copyTextFromUrl();
    }
});
