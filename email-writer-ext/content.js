console.log("Email Writer Extension - content script loaded");

function createAIButtonWithMenu() {
    const container = document.createElement('div');
    container.className = 'ai-reply-container';
    container.style.cssText = `
        display: inline-flex;
        margin-right: 8px;
        position: relative;
    `;

    // Main AI Reply Button
    const button = document.createElement('div');
    button.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3 ai-reply-button';
    button.style.cssText = `
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-right: 1px solid #dadce0;
    `;
    button.innerHTML = "AI Reply";
    button.setAttribute('role', 'button');
    button.setAttribute('data-tooltip', 'Generate AI Reply');
    
    // Dropdown Toggle Button
    const dropdownToggle = document.createElement('div');
    dropdownToggle.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3 ai-dropdown-toggle';
    dropdownToggle.style.cssText = `
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        padding: 8px 6px;
        min-width: 20px;
    `;
    dropdownToggle.innerHTML = "▼";
    dropdownToggle.setAttribute('role', 'button');
    dropdownToggle.setAttribute('data-tooltip', 'Select Tone');
    
    // Dropdown Menu
    const menu = document.createElement('div');
    menu.className = 'ai-tone-menu';
    menu.style.cssText = `
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        background: white;
        border: 1px solid #dadce0;
        border-radius: 4px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        z-index: 1000;
        min-width: 150px;
        margin-top: 4px;
    `;

    const tones = [
        { value: 'professional', label: '👔 Professional', default: true },
        { value: 'casual', label: '😊 Casual' },
        { value: 'friendly', label: '🤝 Friendly' },
        { value: 'none', label: '📝 None' }
    ];

    let selectedTone = 'professional';

    tones.forEach(tone => {
        const menuItem = document.createElement('div');
        menuItem.className = 'ai-tone-option';
        menuItem.style.cssText = `
            padding: 10px 16px;
            cursor: pointer;
            font-size: 13px;
            color: #202124;
            background: ${tone.default ? '#f1f3f4' : 'white'};
        `;
        menuItem.textContent = tone.label;
        menuItem.setAttribute('data-tone', tone.value);

        menuItem.addEventListener('mouseenter', () => {
            menuItem.style.background = '#e8f0fe';
        });

        menuItem.addEventListener('mouseleave', () => {
            menuItem.style.background = selectedTone === tone.value ? '#f1f3f4' : 'white';
        });

        menuItem.addEventListener('click', () => {
            selectedTone = tone.value;
            
            // Update all menu items
            menu.querySelectorAll('.ai-tone-option').forEach(item => {
                item.style.background = 'white';
            });
            menuItem.style.background = '#f1f3f4';
            
            // Update button text
            button.innerHTML = `AI Reply (${tone.label.split(' ')[1]})`;
            
            // Close menu
            menu.style.display = 'none';
        });

        menu.appendChild(menuItem);
    });

    // Toggle dropdown
    dropdownToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!container.contains(e.target)) {
            menu.style.display = 'none';
        }
    });

    container.appendChild(button);
    container.appendChild(dropdownToggle);
    container.appendChild(menu);
    
    return { container, button, dropdownToggle, getTone: () => selectedTone };
}

function getEmailContent() {
    // Focused on common Gmail message body selectors
    const selectors = [
        '.h7', // Title/Subject
        '.a3s.aiL', // Main email body content
        '.gmail_quote', // Threaded replies
    ];
    for (const selector of selectors) {
        const content = document.querySelector(selector);
        if (content) return content.innerText.trim();
    }
    return '';
}

function findComposeToolbar() {
    const selectors = [
        '.btC',
        '.aDh',
        '.gU.Up'
    ];
    for (const selector of selectors) {
        const toolbar = document.querySelector(selector);
        if (toolbar) return toolbar;
    }
    return null;
}

function injectButton() {
    const existingContainer = document.querySelector('.ai-reply-container');
    if (existingContainer) existingContainer.remove();

    const toolbar = findComposeToolbar();
    if (!toolbar) {
        console.log("Toolbar not found");
        return;
    }

    console.log("Toolbar Found, Creating AI button");
    const { container, button, dropdownToggle, getTone } = createAIButtonWithMenu();

    button.addEventListener('click', async () => {
        try {
            const selectedTone = getTone();
            
            const originalText = button.innerHTML;
            button.innerHTML = "Generating...";
            button.style.pointerEvents = 'none';
            dropdownToggle.style.pointerEvents = 'none';

            const emailContent = getEmailContent();
            const response = await fetch('http://localhost:8080/api/email/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    emailContent: emailContent,
                    tone: selectedTone
                })
            });

            if (!response.ok) throw new Error("API Request Failed");

            const generatedReply = await response.text();
            const composeBox = document.querySelector('[role="textbox"]');
            
            if (composeBox) {
                composeBox.focus();
                document.execCommand('insertText', false, generatedReply);
            } else {
                console.error('Compose box not found');
            }
        } catch (error) {
            console.error(error);
            alert('Failed to generate reply');
        } finally {
            button.innerHTML = 'AI Reply';
            button.style.pointerEvents = 'auto';
            dropdownToggle.style.pointerEvents = 'auto';
        }
    });

    toolbar.insertBefore(container, toolbar.firstChild);
}

const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        const addedNodes = Array.from(mutation.addedNodes);
        const hasComposeElements = addedNodes.some(node =>
            node.nodeType === Node.ELEMENT_NODE &&
            (node.matches('.aDh, .btC, [role="dialog"]') || node.querySelector('.aDh, .btC, [role="dialog"]'))
        );
        if (hasComposeElements) {
            console.log("Compose Window Detected");
            setTimeout(injectButton, 500);
        }
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});