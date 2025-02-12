let seatsLeft = 20;  // Total seats available
let reservations = [];  // To store reservation data

// Function to handle the reservation form submission
document.getElementById("reservationForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("customerName").value;
    const phone = document.getElementById("customerPhone").value;
    const guestCount = parseInt(document.getElementById("guestCount").value);

    // Check if the reservation exceeds available seats
    if (guestCount > seatsLeft) {
        alert("Not enough seats available. Please reduce the number of guests.");
        return;
    }

    // Check for duplicate names
    if (reservations.some(reservation => reservation.name === name)) {
        alert("A reservation with this name already exists.");
        return;
    }

    // Create a new reservation object
    const reservation = {
        name: name,
        phone: phone,
        guestCount: guestCount,
        checkInTime: new Date().toLocaleString(),
        checkedOut: false,
    };

    // Add reservation to the array
    reservations.push(reservation);
    seatsLeft -= guestCount;  // Update seats left
    updateUI();  // Update UI after reservation
    clearForm();
});

// Function to update the UI based on current reservations and available seats
function updateUI() {
    // Update the seats left count
    document.getElementById("seatsLeft").textContent = seatsLeft;

    // Update the reservation table
    const tableBody = document.getElementById("reservationTable").getElementsByTagName('tbody')[0];
    tableBody.innerHTML = "";  // Clear the table

    reservations.forEach((reservation, index) => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = reservation.name;
        row.appendChild(nameCell);

        const phoneCell = document.createElement("td");
        phoneCell.textContent = reservation.phone;
        row.appendChild(phoneCell);

        const checkInTimeCell = document.createElement("td");
        checkInTimeCell.textContent = reservation.checkInTime;
        row.appendChild(checkInTimeCell);

        const checkoutCell = document.createElement("td");
        const checkoutButton = document.createElement("button");
        checkoutButton.textContent = reservation.checkedOut ? "Checked Out" : "Click to Checkout";
        checkoutButton.disabled = reservation.checkedOut;
        checkoutButton.addEventListener("click", function () {
            checkoutReservation(index);
        });
        checkoutCell.appendChild(checkoutButton);
        row.appendChild(checkoutCell);

        const deleteCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function () {
            deleteReservation(index);
        });
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        tableBody.appendChild(row);
    });
}

// Function to handle checkout
function checkoutReservation(index) {
    const reservation = reservations[index];
    reservation.checkedOut = true;
    seatsLeft += reservation.guestCount;  // Update seats left
    updateUI();
}

// Function to delete a reservation
function deleteReservation(index) {
    const reservation = reservations[index];
    if (!reservation.checkedOut) {
        seatsLeft += reservation.guestCount;  // Restore seats if not checked out
    }
    reservations.splice(index, 1);  // Remove reservation from the array
    updateUI();
}

// Function to clear the form inputs
function clearForm() {
    document.getElementById("customerName").value = "";
    document.getElementById("customerPhone").value = "";
    document.getElementById("guestCount").value = "";
}
