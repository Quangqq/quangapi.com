document.getElementById('smsForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const phone = document.getElementById('phone').value;
    const amout = document.getElementById('amout').value;

    const apiUrl = 'https://api.nqtool.net/spamsms/';
    const params = new URLSearchParams({ phone: phone, amout: amout });

    fetch(`${apiUrl}?${params}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {  // Check if the API response indicates success
                alert('Request successful!');
            } else {
                alert('Thành Công');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Thành công');
        });
});