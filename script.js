let isDarkMode = false;

document.getElementById('themeToggle').addEventListener('click', function() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode');

    // Change background color with animation
    if (isDarkMode) {
        document.body.style.backgroundColor = '#121212';
    } else {
        document.body.style.backgroundColor = '';
    }

    // Button animation
    const button = document.getElementById('themeToggle');
    button.classList.add('animate');
    setTimeout(() => {
        button.classList.remove('animate');
    }, 300);
});

// Auto-changing background color
setInterval(() => {
    if (!isDarkMode) {
        const colors = ['#ff9a9e', '#fad0c4', '#ffdde1', '#ff9a9e'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        document.body.style.backgroundColor = randomColor;
    }
}, 5000);

document.getElementById('downloadBtn').addEventListener('click', function() {
    // Button animation
    const button = document.getElementById('downloadBtn');
    button.classList.add('animate');
    setTimeout(() => {
        button.classList.remove('animate');
    }, 300);
    
    const url = document.getElementById('instaUrl').value;
    if (!url) {
        alert('Please enter a valid Instagram URL.');
        return;
    }
    
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('result').innerHTML = '';
    button.style.display = 'none'; // Hide the download button while loading
    
    fetch(`https://bk9.fun/download/instagram?url=${encodeURIComponent(url)}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('loading').classList.add('hidden');
            console.log(data); // Log the response data for debugging
            if (data.status && data.BK9.length > 0) {
                const videoUrl = data.BK9[0].url;
                // Update the download button to link directly to the video
                button.innerHTML = 'Download Video';
                button.setAttribute('href', videoUrl);
                button.setAttribute('download', '');
                button.style.display = 'inline-block'; // Show the button after loading
                document.getElementById('result').innerHTML = `<a href="${videoUrl}" target="_blank" download class="download-btn show">Video is ready to download!</a>`; // Show message
            } else {
                document.getElementById('result').innerHTML = '<p>Failed to fetch video. Try again later.</p>';
            }
        })
        .catch(error => {
            document.getElementById('loading').classList.add('hidden');
            document.getElementById('result').innerHTML = '<p>Error fetching video.</p>';
            console.error('Error fetching video:', error); // Log the error for debugging
        });
});

// Contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Thank you for reaching out! We will get back to you soon.');
        contactForm.reset();
    });
}
