document.getElementById('mail-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const count = document.getElementById('count').value;
    const interval = document.getElementById('interval').value;
    const statusMessage = document.getElementById('status-message');

    statusMessage.textContent = 'Gönderim başlatılıyor...';
    statusMessage.style.color = '#007bff';

    try {
        const response = await fetch('http://localhost:3000/send-mail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                message,
                count,
                interval
            })
        });

        const result = await response.json();

        if (response.ok) {
            statusMessage.textContent = `Başarıyla gönderildi: ${result.sentCount} adet.`;
            statusMessage.style.color = '#28a745';
        } else {
            throw new Error(result.error || 'Sunucudan bir hata oluştu.');
        }

    } catch (error) {
        statusMessage.textContent = `Hata: ${error.message}`;
        statusMessage.style.color = '#dc3545';
    }
});