// script.js

document.getElementById('newWindowButton').addEventListener('click', () => {
    createWindow('New Window');
});

document.getElementById('settingsButton').addEventListener('click', () => {
    createSettingsWindow();
});

document.getElementById('githubButton').addEventListener('click', () => {
    createGitHubApp();
});

let windowCount = 0;

function createWindow(title) {
    windowCount++;
    const windowElement = document.createElement('div');
    windowElement.className = 'window';
    windowElement.innerHTML = `
        <div class="titlebar">
            <span class="title">${title} ${windowCount}</span>
            <div>
                <button class="minimize-button">_</button>
                <button class="restore-button">[]</button>
                <button class="close-button">X</button>
            </div>
        </div>
        <div class="content">
            <p>Welcome to the simulated OS ${title} ${windowCount}!</p>
        </div>
    `;

    document.querySelector('.desktop').appendChild(windowElement);

    setupWindowControls(windowElement);
}

function createSettingsWindow() {
    const settingsWindow = document.createElement('div');
    settingsWindow.className = 'window';
    settingsWindow.innerHTML = `
        <div class="titlebar">
            <span class="title">Settings</span>
            <div>
                <button class="minimize-button">_</button>
                <button class="restore-button">[]</button>
                <button class="close-button">X</button>
            </div>
        </div>
        <div class="settings-content">
            <label for="username">Username:</label>
            <input type="text" id="username" placeholder="Enter your username">
            <label for="volume">Volume:</label>
            <input type="number" id="volume" min="0" max="100" placeholder="Volume level">
            <button id="saveSettings">Save</button>
        </div>
    `;

    document.querySelector('.desktop').appendChild(settingsWindow);

    setupWindowControls(settingsWindow);

    document.getElementById('saveSettings').addEventListener('click', () => {
        const username = document.getElementById('username').value;
        const volume = document.getElementById('volume').value;
        alert(`Settings saved:\nUsername: ${username}\nVolume: ${volume}`);
    });
}

function createGitHubApp() {
    const githubWindow = document.createElement('div');
    githubWindow.className = 'window';
    githubWindow.innerHTML = `
        <div class="titlebar">
            <span class="title">GitHub</span>
            <div>
                <button class="minimize-button">_</button>
                <button class="restore-button">[]</button>
                <button class="close-button">X</button>
            </div>
        </div>
        <div class="content">
            <p>Click the button below to visit GitHub:</p>
            <button id="visitGitHub">Go to GitHub</button>
        </div>
    `;

    document.querySelector('.desktop').appendChild(githubWindow);

    setupWindowControls(githubWindow);

    document.getElementById('visitGitHub').addEventListener('click', () => {
        window.open('https://github.com', '_blank');
    });
}

function setupWindowControls(windowElement) {
    const titlebar = windowElement.querySelector('.titlebar');
    const minimizeButton = windowElement.querySelector('.minimize-button');
    const restoreButton = windowElement.querySelector('.restore-button');
    const closeButton = windowElement.querySelector('.close-button');

    let isDragging = false;
    let offsetX, offsetY;

    titlebar.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - windowElement.getBoundingClientRect().left;
        offsetY = e.clientY - windowElement.getBoundingClientRect().top;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            windowElement.style.left = `${e.clientX - offsetX}px`;
            windowElement.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    minimizeButton.addEventListener('click', () => {
        windowElement.classList.add('minimized');
    });

    restoreButton.addEventListener('click', () => {
        windowElement.classList.remove('minimized');
    });

    closeButton.addEventListener('click', () => {
        windowElement.remove();
    });
}
