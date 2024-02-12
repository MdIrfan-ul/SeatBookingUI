document.addEventListener('DOMContentLoaded', function () {
    const movieList = [
        { name: "Flash", price: 7 },
        { name: "Avengers", price: 10 },
        // Add more movies as needed
    ];

    // Targeting the divs using dom
    const selectMovie = document.getElementById('selectMovie');
    const movieName = document.getElementById('movieName');
    const moviePrice = document.getElementById('moviePrice');
    const selectedSeatsHolder = document.getElementById('selectedSeatsHolder');
    const totalPrice = document.getElementById('totalPrice');
    const numberOfSeat = document.getElementById('numberOfSeat');
    const proceedBtn = document.getElementById('proceedBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const seats = document.querySelectorAll('#seatCont .seat');

    // Populate movie dropdown
    movieList.forEach(movie => {
        const option = document.createElement('option');
        option.value = movie.name;
        option.textContent = movie.name;
        selectMovie.appendChild(option);
    });

    // Default movie selection
    let selectedMovie = movieList[0];
    movieName.textContent = selectedMovie.name;
    moviePrice.textContent = `$ ${selectedMovie.price}`;

    // Event listener for movie selection
    selectMovie.addEventListener('change', function () {
        selectedMovie = movieList.find(movie => movie.name === this.value);
        movieName.textContent = selectedMovie.name;
        moviePrice.textContent = `$ ${selectedMovie.price}`;
        updateTotalPrice();
    });

    // Event listener for seat selection
    const selectedSeats = [];
    seats.forEach(seat => {
        seat.addEventListener('click', function () {
            if (!this.classList.contains('occupied')) {
                this.classList.toggle('selected');
                updateSelectedSeats();
                updateTotalPrice();
            }
        });
    });

    // Event listener for continue button
    proceedBtn.addEventListener('click', function () {
        if (selectedSeats.length === 0) {
            alert('Oops, no seat selected!');
        } else {
            alert('Yayy! Your seats have been booked.');
            selectedSeats.forEach(seat => seat.classList.add('occupied'));
            updateSelectedSeats();
            updateTotalPrice();
        }
    });

    // Event listener for cancel button
    cancelBtn.addEventListener('click', function () {
        selectedSeats.forEach(seat => seat.classList.remove('selected'));
        selectedSeats.length = 0;
        updateSelectedSeats();
        updateTotalPrice();
    });

    // Helper function to update selected seats
    function updateSelectedSeats() {
        selectedSeats.length = 0;
        seats.forEach(seat => {
            if (seat.classList.contains('selected')) {
                selectedSeats.push(seat);
            }
        });
        const seatCount = selectedSeats.length;
        
        numberOfSeat.textContent = seatCount;
        selectedSeatsHolder.innerHTML = seatCount > 0 ? selectedSeats.map(seat => `<span>${seat.textContent}</span>`).join(``) : 'No seat selected';
      
    }

    // Helper function to update total price
    function updateTotalPrice() {
        totalPrice.textContent = `$ ${selectedSeats.length * selectedMovie.price}`;
    }
});
