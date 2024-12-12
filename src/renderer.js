function showNotification(message, type = 'info', duration = 2000) {
    const notification = document.getElementById('notification');
    notification.textContent = message;

    notification.className = `notification notification-${type} notification-show`;
    notification.style.opacity = '1';

    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.classList.remove('notification-show');
        }, 400);
    }, duration);
}

async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showNotification('Room link copied to clipboard!', 'success');
    } catch (err) {
        console.error('Failed to copy: ', err);
        showNotification('Failed to copy the room link.', 'error');
    }
}

function showRoomLink(roomLink) {
    const roomLinkTextarea = document.getElementById('roomLink');
    roomLinkTextarea.value = roomLink;
    roomLinkTextarea.style.display = 'block';
    document.getElementById('copyButton').style.display = 'inline-block';
}

function showError(error) {
    console.error('Error creating room:', error);
    const roomLinkTextarea = document.getElementById('roomLink');
    roomLinkTextarea.value = `Error creating room: ${error.message}`;
    roomLinkTextarea.style.display = 'block';
    document.getElementById('copyButton').style.display = 'none';
    showNotification('Error creating room. Please try again.', 'error');
}

async function createRoom() {
    const videoUrl = document.getElementById('videoUrl').value.trim();

    if (!videoUrl) {
        showNotification('Please enter a valid video URL.', 'warning');
        return;
    }

    try {
        const roomLink = await window.electron.invokeCreateRoom(videoUrl);
        showRoomLink(roomLink);
        showNotification('Room created successfully!', 'success');
    } catch (error) {
        showError(error);
    }
}

// Event listeners
document.getElementById('createRoom').addEventListener('click', createRoom);

document.getElementById('copyButton').addEventListener('click', () => {
    const roomLink = document.getElementById('roomLink').value;
    if (roomLink) {
        copyToClipboard(roomLink);
    } else {
        showNotification('No room link available to copy.', 'warning');
    }
});
