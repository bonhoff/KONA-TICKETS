document.addEventListener("DOMContentLoaded", function () {
    showAllEvents();

    document.getElementById("shoppingCartBtn").addEventListener("click", () => {
        window.location.href = "shoppingCart.html"
    });

    document.getElementById("createEvBtn").addEventListener("click", () => {
        showEventForm();
    });

    document.getElementById("submitCrEvBtn").addEventListener("click", (e) => {
        createEvent();
    });

    document.getElementById("submitSBtn").addEventListener("click", (e) => {
        e.preventDefault();
        searchEvents();
    })

    const findSeatButtons = document.querySelectorAll(".findSeatBtn");
    findSeatButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const target = e.target;
            saveTicketInfo(target);
        });
    });

});
let counterItems = 0;
let events;

function showEventForm() {
    const eventForm = document.getElementById("eventForm");
    eventForm.style.display = "block"
}

function createEvent() {
    const evName = document.getElementById("evNameInput").value;
    const evDesc = document.getElementById("evDescInput").value;
    const evLoc = document.getElementById("evLocInput").value;
    const evDate = document.getElementById("evDateInput").value;
    const evTime = document.getElementById("evTimeInput").value;
    const evPrice = document.getElementById("evPriceInput").value;
    const evQuant = document.getElementById("evQuantityInput").value;

    const event = {
        name: evName,
        description: evDesc,
        location: evLoc,
        date: evDate,
        time: evTime,
        price: evPrice,
        quantity: evQuant
    }

    if (localStorage.getItem("events")) {
        events = JSON.parse(localStorage.getItem("events"));
    } else {
        events = [];
    }

    events.push(event);
    localStorage.setItem('events', JSON.stringify(events));

    document.getElementById("eventForm").style.display = "none";

}

function searchEvents() {
    const searchName = document.getElementById("nameSInput").value;
    const searchDate = document.getElementById("dateSInput").value;

    if (localStorage.getItem("events")) {
        events = JSON.parse(localStorage.getItem("events"));
    } else {
        events = [];
    }

    document.getElementById("resultsList").innerHTML = "";

    if (events.length != null) {
        for (let i = 0; i < events.length; i++) {
            if (searchName == events[i].name) {
                indexCard(i);
            }
            if (searchDate == events[i].date) {
                indexCard(i);
            }
        }
    } else {
        document.getElementById("resultsList").innerHTML = "<h3>No Results Found</h3>";
    }
}

function showAllEvents() {
    if (localStorage.getItem("events")) {
        events = JSON.parse(localStorage.getItem("events"));
    } else {
        events = [];
    }
    if (events != null) {
        for (let i = 0; i < events.length; i++) {
            indexCard(i);
        }
    } else {
        document.getElementById("resultsList").innerHTML = ("<h3 style=color:red>No Events To Show</h3>");
    }
}

function indexCard(index) {
    const eventDiv = document.createElement("div");
    eventDiv.classList.add("eventDivs");

    const eventInfo = document.createElement("div");
    eventInfo.classList.add("eventInfo");
    eventInfo.innerHTML = `
        <h3>${events[index].name}</h3>
        <p>${events[index].description}</p>
        <p>${events[index].location}</p>
        <p>${events[index].date}</p>
        <p>${events[index].time}</p>
        <p>${events[index].price} $</p>
        <p>${events[index].quantity} Tickets Left</p>`;

    const findSeatBtn = document.createElement("button");
    findSeatBtn.classList.add("findSeatBtn");
    findSeatBtn.innerText = "Add to Cart >";

    const eventActions = document.createElement("div");
    eventActions.classList.add("eventActions");
    eventActions.appendChild(findSeatBtn);

    eventDiv.appendChild(eventInfo);
    eventDiv.appendChild(eventActions);
    document.getElementById("resultsList").appendChild(eventDiv);

}

function saveTicketInfo(target) {
    const eventDiv = target.closest(".eventDivs");
    if (eventDiv) {
        const eventInfo = {
            name: eventDiv.querySelector("h3").textContent,
            date: eventDiv.querySelectorAll(".eventInfo p")[2].textContent,
            location: eventDiv.querySelectorAll(".eventInfo p")[1].textContent,
            price: eventDiv.querySelectorAll(".eventInfo p")[4].textContent,
        };

        if (localStorage.getItem("ticketSel")) {
            selectedEvents = JSON.parse(localStorage.getItem("ticketSel"));
        } else {
            selectedEvents = [];
        }

        if (selectedEvents.length < 3) {
            selectedEvents.push(eventInfo);
            localStorage.setItem("ticketSel", JSON.stringify(selectedEvents));
            alert("Added to cart!")
        } else {
            alert("Only 3 ticket per user!");
        }
    }
}

