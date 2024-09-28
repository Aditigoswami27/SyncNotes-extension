$(document).ready(function () {
    const API_url = "http://localhost:3000";

    // Function to fetch and display notes
    function fetchNotes(filterCategory = "None") {
        axios.get(`${API_url}/getnotes`)
            .then(response => {
                const notes = response.data;
                const notesContainer = $('#notesContainer');
                const loadingElement = $('#loading');
    
                loadingElement.hide();
                notesContainer.empty();
    
                if (notes.length === 0) {
                    notesContainer.html('<p>No notes available.</p>');
                    return;
                }
    
                let filteredNotes = notes;
    
                // Apply filter if a category is selected
                if (filterCategory !== "None") {
                    filteredNotes = notes.filter(note => note.category === filterCategory);
                }
    
                if (filteredNotes.length === 0) {
                    notesContainer.html('<p>No notes available for this category.</p>');
                    return;
                }
    
                // Sort filtered notes: prioritize notes with priority 1 at the top
                filteredNotes.sort((a, b) => b.priority - a.priority);
    
                filteredNotes.forEach((note, index) => {
                    const noteItem = $('<div>').addClass('note-item');
    
                    const titleElement = $('<div>').addClass('note-title').text(`${index + 1}. ${note.title}`);
    
                    const urlElement = $('<div>').addClass('note-url').html(`
                        <a href="${note.url}" target="_blank"><strong>Website link</strong></a>
                    `);
                    const lblElement = $('<div>').addClass('note-label').text(`${note.category}`);
                    const contentElement = $('<div>').addClass('note-content').html(note.description);
    
                    // Create the toggle button
                    const toggleButton = $('<button>')
                        .addClass('toggle-button')
                        .text(note.priority === 1 ? 'Not Important' : 'Important')
                        .toggleClass('important', note.priority === 1)
                        .data('id', note.id)
                        .data('priority', note.priority);
    
                    // Toggle content visibility on title click
                    titleElement.on('click', function () {
                        contentElement.toggle();
                    });
    
                    // ... previous code remains unchanged

// Create the toggle button

// Toggle content visibility on title click
titleElement.on('click', function () {
contentElement.toggle();
});

// Handle toggle button click
toggleButton.on('click', function () {
const currentPriority = $(this).data('priority');
const newPriority = currentPriority === 1 ? 0 : 1; // Toggle priority

// Update the priority in the database
axios.put(`${API_url}/updatePriority`, {
    id: $(this).data('id'),
    priority: newPriority
})
.then(response => {
    // Fetch and display notes again to reflect the updated priority
    fetchNotes($('#label').val()); // Pass the current selected category to keep the filter
})
.catch(error => {
    console.log('Error updating priority:', error);
});
});

// ... remaining code to append noteItem to notesContainer

                    noteItem.append(titleElement).append(urlElement).append(lblElement).append(contentElement).append(toggleButton);
                    notesContainer.append(noteItem);
                });
            })
            .catch(error => {
                console.log('Error fetching notes:', error);
                $('#loading').text('Failed to load notes.');
            });
    }
    

    // Fetch and display notes on page load
    fetchNotes();

    // Add event listener to the dropdown (combobox) for filtering notes
    $('#label').on('change', function () {
        const selectedCategory = $(this).val(); // Get the selected category
        fetchNotes(selectedCategory); // Fetch and display notes based on the selected filter
    });
});
