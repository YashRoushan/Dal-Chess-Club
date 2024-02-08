import logo from "./images/logo.png";
import winter from "./images/winter-blitz.jpg"
import rapid from "./images/winter-rapid-open.jpg"

export const tournamentsList = [
    {
        name: "Winter Blitz Battle",
        image: winter,
        date: "2024-02-12T18:00:00",
        endDate: "2024-02-12T20:00:00",
        participantsNo: 0,
        price: 10,
        description: "This tournament is a low-pressure event open to everyone. It’s an opportunity to play against players in the local area over the board.",
        registrationLink: "https://l.facebook.com/l.php?u=https%3A%2F%2Fforms.office.com%2Fr%2Fm9ZB2AZCLP&h=AT02vLo7kQW0pNhO28ev21WS9ffiWUFGLVMLyTttmQ1HxmY06KDows0cdhhhseNTdT1DHNtSnkzFZknKNZNjm0PDePpVkUiAGgoVTxtkJC-zg-ySxvzRMNRBVfeecUPS1FQN0v5I9pCPtiFhM70R&__tn__=q&c[0]=AT179q0-DN5b4P7A3pqXjcQWikhnDLjWvjZMPFgWhKC86gUBCI-bsygkrrypQ-QltNA8fJNkXidE_joKqWif7gR6cFybdbjg8ZifzDS-_uDHqaWnGFumplKFN0h4JKsEUGuGerlyiXgFZw5bbWcLHH6YUSX8UTytZAc9vaebwHSkMJ6y4H9e",
        prize: "Medals will be awarded to the top 3 players.",
        type: "5-Round Swiss",
        location: "Dalhousie Student Union",
    },
    {
        name: "Dalhousie Winter Rapid Open",
        image: rapid,
        date: "2024-01-14T09:30:00",
        participantsNo: 0,
        price: 20,
        description: "This will be an over-the-board tournament open to anyone who wants to play other local players. The winner of this tournament will be qualified to play in the Dalhousie Chess Championship, which will be hosted in March.",
        type: "5-Round Swiss",
        location: "Dalhousie Student Union",
    },
    {
        name: "Tournament 3",
        image: logo,
        date: "2024-03-01T14:00:00",
        participantsNo: 0,
        price: 5,
        description: "Ad laboris velit proident irure excepteur eiusmod aliquip et.",
    },
]