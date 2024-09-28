
$(document).ready(function() {
    const API_url = "http://localhost:3000";
    console.log('Popup script loaded');
 
    function applyInlineStyle(tag) {
        const selection = window.getSelection();
        if (!selection.rangeCount) return;  // If there's no text selected, return
    
        const range = selection.getRangeAt(0);  // Get the selected text range
        const selectedText = range.extractContents();  // Extract the selected text
    
        // Create a new element for bold or italic
        const newElement = document.createElement(tag);
        newElement.appendChild(selectedText);
    
        range.insertNode(newElement);  // Insert the newly formatted element
    }
    
    // Function to apply ordered or unordered list by wrapping text in <ol> or <ul>
    function applyListStyle(tag) {
        const selection = window.getSelection();
        if (!selection.rangeCount) return;
    
        const range = selection.getRangeAt(0);
        const selectedText = range.extractContents();
    
        // Create a new list element
        const newList = document.createElement(tag);
        const listItem = document.createElement('li');
        listItem.appendChild(selectedText);
        newList.appendChild(listItem);
    
        range.insertNode(newList);
    }
    
    // Event listeners for buttons
    document.getElementById('bold-btn').addEventListener('click', function(event) {
        event.preventDefault();  // Prevent default button behavior
        event.stopPropagation(); // Stop other events
        applyInlineStyle('strong');
    });
    
    document.getElementById('italic-btn').addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        applyInlineStyle('em');
    });
    
    document.getElementById('underline-btn').addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        applyInlineStyle('u');
    });

    document.getElementById('ordered-list-btn').addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        applyListStyle('ol');
    });
    
    document.getElementById('unordered-list-btn').addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        applyListStyle('ul');
    });

    function checkUrlExists(url, callback) {
        console.log('Checking if URL exists:', url);
        axios.post(`${API_url}/checkurl`, { url: url })
            .then(response => {
                console.log('URL exists response:', response.data);
                callback(response.data.exists, response.data.note);
            })
            .catch(error => {
                console.error('Error checking URL:', error);
                callback(false, null);
            });
    }

    function saveNote() {
        const title = $('#title').val();
        const notes = $('#notes').html();
        const label = $("#label").val();
        console.log('Saving note:', { title, notes,label});
        if (title) {
            chrome.runtime.sendMessage({ todo: "getCurrentUrl" }, function(response) {
                if (response.url) {
                    console.log('Current URL:', response.url);
                    axios.post(`${API_url}/savenote`, {
                        url: response.url,
                        title: title,
                        notes: notes,
                        label :label
                    })
                    .then(response => {
                        console.log('Note saved successfully:', response.data);
                        chrome.notifications.create('saveNotification', {
                            type: 'basic',
                            iconUrl: 'icon-128.png',
                            title: 'Note Saved Successfully!',
                            message: 'Your note has been saved.'
                        }, function(notificationId) {
                            if (chrome.runtime.lastError) {
                                console.error('Notification error:', chrome.runtime.lastError);
                            } else {
                                console.log('Notification created with ID:', notificationId);
                            }
                        });
                        window.close(); // Close the popup after operation
                    })
                    .catch(error => {
                        console.error('Error saving note:', error);
                    });
                } else {
                    console.error('Could not get the current tab URL');
                }
            });
        } else {
            console.error('Title is required');
        }
    }

    function editNote() {
        const title = $('#title').val();
        const notes = $('#notes').html();
        const label = $('#label').val();
        console.log(label); 
        console.log('Editing note:', { title, notes,label });
        chrome.runtime.sendMessage({ todo: "getCurrentUrl" }, function(response) {
            if (response.url) {
                console.log('Current URL:', response.url);
                axios.post(`${API_url}/editnote`, {
                    url: response.url,
                    title: title,
                    notes: notes,
                    label: label
                })
                .then(response => {
                    console.log('Note edited successfully:', response.data);
                    chrome.notifications.create('editNotification', {
                        type: 'basic',
                        iconUrl: 'icon-128.png',
                        title: 'Note Edited Successfully!',
                        message: 'Your note has been edited.'
                    }, function(notificationId) {
                        if (chrome.runtime.lastError) {
                            console.error('Notification error:', chrome.runtime.lastError);
                        } else {
                            console.log('Notification created with ID:', notificationId);
                        }
                    });
                    window.close(); // Close the popup after operation
                })
                .catch(error => {
                    console.error('Error editing note:', error);
                });
            } else {
                console.error('Could not get the current tab URL');
            }
        });
    }

    function removeNote() {
        chrome.runtime.sendMessage({ todo: "getCurrentUrl" }, function(response) {
            if (response.url) {
                console.log('Current URL:', response.url);
                axios.post(`${API_url}/removenote`, { url: response.url })
                    .then(response => {
                        console.log('Note removed successfully:', response.data);
                        chrome.notifications.create('removeNotification', {
                            type: 'basic',
                            iconUrl: 'icon-128.png',
                            title: 'Note Removed Successfully!',
                            message: 'Your note has been removed.'
                        }, function(notificationId) {
                            if (chrome.runtime.lastError) {
                                console.error('Notification error:', chrome.runtime.lastError);
                            } else {
                                console.log('Notification created with ID:', notificationId);
                            }
                        });
                        window.close(); // Close the popup after operation
                    })
                    .catch(error => {
                        console.error('Error removing note:', error);
                    });
            } else {
                console.error('Could not get the current tab URL');
            }
        });
    }

    // Check if URL exists when popup is loaded
    chrome.runtime.sendMessage({ todo: "getCurrentUrl" }, function(response) {
        if (response.url) {
            checkUrlExists(response.url, function(exists, note) {
                if (exists) {
                    $('#editButton').show();
                    $('#removeButton').show();
                    // Prefill the title and notes fields with the existing data
                    $('#title').val(note.title);
                    $('#notes').val(note.description);
                } else {
                    $('#saveButton').show();
                    $('#removeButton').show();
                }
            });
        } else {
            console.error('Could not get the current tab URL');
        }
    });

    $('#saveButton').click(saveNote);
    $('#editButton').click(editNote);
    $('#removeButton').click(removeNote);
});
