// modal controller
const modalController = {
    show() {
        document.getElementById('modal').style.display = 'flex';
    },
    
    hide() {
        document.getElementById('modal').style.display = 'none';
    },
    
    handleOutsideClick(event) {
        if (event.target === document.getElementById('modal')) {
            this.hide();
        }
    }
};

// modal controls event listeners
document.querySelector('.countdown').addEventListener('click', async () => {
    modalController.show();
    await loadMilestones();
});

document.getElementById('close-btn').addEventListener('click', () => modalController.hide());
window.addEventListener('click', (event) => modalController.handleOutsideClick(event));

// data loading
async function fetchMilestones() {
    const response = await fetch('./milestones.yaml');
    if (!response.ok) {
        throw new Error(`http error! status: ${response.status}`);
    }
    return await response.text();
}

function loadMilestonesSync() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', './milestones.yaml', false);
    try {
        xhr.send();
        if (xhr.status === 200) {
            return xhr.responseText;
        }
        throw new Error(`http error! status: ${xhr.status}`);
    } catch (error) {
        console.error('xmlhttprequest failed:', error);
        throw error;
    }
}

async function loadMilestones() {
    try {
        let yamlText;
        
        try {
            console.log('attempting to fetch milestones.yaml...');
            yamlText = await fetchMilestones();
        } catch (fetchError) {
            console.error('fetch failed:', fetchError);
            console.log('falling back to xmlhttprequest...');
            yamlText = loadMilestonesSync();
        }

        if (!yamlText) {
            throw new Error('failed to load milestones file');
        }

        console.log('parsing yaml data...');
        const milestonesData = parseMilestonesData(yamlText);
        displayMilestones(milestonesData);
    } catch (error) {
        handleMilestonesError(error);
    }
}

// data processing
function parseMilestonesData(yamlText) {
    const data = jsyaml.load(yamlText);
    console.log('parsed data:', data);
    
    if (!data?.milestones?.length) {
        throw new Error('invalid milestones data format');
    }
    
    return [...data.milestones].sort((a, b) => new Date(a.date) - new Date(b.date));
}

// ui functions
function displayMilestones(sortedMilestones) {
    const milestoneList = document.getElementById('milestone-list');
    milestoneList.innerHTML = '';
    
    if (sortedMilestones.length === 0) {
        showErrorMessage('no milestones found');
        return;
    }
    
    sortedMilestones.forEach(milestone => {
        const milestoneElement = createMilestoneElement(milestone);
        milestoneList.appendChild(milestoneElement);
    });
}

function showErrorMessage(message) {
    document.getElementById('milestone-list').innerHTML = 
        `<div class="error-message">${message}</div>`;
}

function handleMilestonesError(error) {
    console.error('error loading milestones:', error);
    showErrorMessage(`unable to load milestones: ${error.message}`);
}

// date formatting
function formatDateEST(dateInput) {
    try {
        let date;
        
        // Handle different types of date input
        if (dateInput instanceof Date) {
            date = dateInput;
        } else if (typeof dateInput === 'string') {
            // Parse the date string and set time to noon UTC
            const [year, month, day] = dateInput.split('-').map(num => parseInt(num, 10));
            date = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
        } else {
            date = new Date(dateInput);
        }
        
        if (isNaN(date.getTime())) {
            throw new Error('Invalid date');
        }

        return new Intl.DateTimeFormat('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            timeZone: 'UTC'  // Use UTC to avoid timezone conversion
        }).format(date);
    } catch (error) {
        console.error('Error formatting date:', error, 'Input was:', dateInput);
        return String(dateInput);
    }
}

// milestone element creation
function createMilestoneElement(milestone) {
    const div = document.createElement('div');
    div.className = 'milestone-item';
    
    const dateStr = formatDateEST(milestone.date);
    
    div.innerHTML = `
        <div class="milestone-content">
            <span class="milestone-text">${milestone.text}</span>
            <span class="milestone-date">${dateStr}</span>
            ${milestone.description ? 
                `<span class="milestone-description">${milestone.description}</span>` 
                : ''}
        </div>
    `;
    
    return div;
}