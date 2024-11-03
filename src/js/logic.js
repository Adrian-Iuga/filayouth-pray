"use strict";

window.onload = fetchCauses;

async function addCause() {
    try {
        postCause();
        fetchCauses();
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('responseMessage').innerText = 'An error occurred';
    }
}

async function postCause() {
    const cause = document.getElementById('cause').value;
    const causeCategory = document.getElementById('causeCategory').value;

    if (causeCategory === "type") {
        document.getElementById('responseMessage').innerText = "Tipul cauzei nu a fost selectat!";
        document.getElementById('responseMessage').style.color = 'red';
        return;
    }

    const response = await fetch('/add-text', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cause, causeCategory }), // Send text as JSON
    });

    const message = await response.text();
    document.getElementById('responseMessage').innerText = message;
    document.getElementById('responseMessage').style.color = 'green';

    document.getElementById('cause').value = '';
    document.getElementById('causeCategory').value = 'type';
}

async function fetchCauses() {
    const response = await fetch('/causes');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const causes = await response.json(); // Parse the JSON response

    populateCauses(causes)
}

async function populateCauses(causes) {
    const causesList = document.getElementById('causes');

    if (causes && causes.length === 0) {
        causesList.innerHTML = "Momentan nu este nici o cauză adăugată"; // Set the text content to the cause
        causesList.classList.add("text-center") = ''; // Clear any existing content                    
        causesList.classList.remove("text-left") = ''; // Clear any existing content

        return;
    } else {
        causesList.innerHTML = ''; // Clear any existing content   
        causesList.classList.remove("text-center"); // Clear any existing content                    
        causesList.classList.add("text-left"); // Clear any existing content                    
    }

    var splittedLine = causes[0].split(" | ");
    var previousCategory = splittedLine[0];

    // Iterate over the causes array
    causes.forEach((cause, index) => {
        var causeArray = cause.split(" | ");
        var currentCategory = causeArray[0];
        var currentCause = causeArray[1];

        if (index === 0) {
            const p = document.createElement('p'); // Create a new list item
            p.textContent = previousCategory; // Set the text content to the cause
            p.classList.add('mb-3');
            causesList.appendChild(p); // Append the list item to the causes list
        } else if (previousCategory !== currentCategory) {
            previousCategory = currentCategory;
            const p = document.createElement('p'); // Create a new list item
            p.textContent = currentCategory; // Set the text content to the cause
            p.classList.add('mb-3');
            causesList.appendChild(p); // Append the list item to the causes list
        }

        const li = document.createElement('li'); // Create a new list item
        li.textContent = currentCause; // Set the text content to the cause
        li.classList.add('mb-3');
        causesList.appendChild(li); // Append the list item to the causes list
    });
}