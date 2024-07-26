document.addEventListener('DOMContentLoaded', function() {
    const soalContainer = document.querySelector('.soal-container');
    const gridItems = document.querySelectorAll('.grid-item');
    const soalElements = document.querySelectorAll('.soal');
    const formCheckOptions = document.querySelectorAll('.form-check-option');
    const rangeInput = document.getElementById('range-input');
    const rangeLabels = document.querySelectorAll('.range-label');
    const totalSoal = 7;
    let currentSoal = 1;
    let timer;
    let seconds = 0;

    function updateRangeLabel(value) {
        rangeLabels.forEach(label => {
            if (label.getAttribute('data-value') == value) {
                label.classList.add('active');
            } else {
                label.classList.remove('active');
            }
        });
    }

    function showSoal(soalNumber) {
        soalElements.forEach((soal) => {
            soal.style.display = 'none';
        });
        document.querySelector(`#soal-${soalNumber}`).style.display = 'block';
    }

    function updateSelection(selectedItem) {
        gridItems.forEach((item) => {
            item.classList.remove('selected');
        });
        selectedItem.classList.add('selected');
    }

    function updateButtons() {
        const nextButton = document.getElementById('next-button');
        const submitButton = document.getElementById('submit-button');
        if (currentSoal === totalSoal) {
            nextButton.style.display = 'none';
            submitButton.style.display = 'inline-block';
        } else {
            nextButton.style.display = 'inline-block';
            submitButton.style.display = 'none';
        }
    }

    function startStopwatch() {
        timer = setInterval(() => {
            seconds++;
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            document.getElementById('time-display').textContent = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
        }, 1000);
    }

    function stopStopwatch() {
        clearInterval(timer);
    }

    formCheckOptions.forEach((option) => {
        option.addEventListener('click', () => {
            const input = option.querySelector('input');
            if (input.type === 'radio') {
                formCheckOptions.forEach((opt) => {
                    opt.classList.remove('selected');
                    opt.querySelector('input').checked = false;
                });
                option.classList.add('selected');
                input.checked = true;
            }
        });
    });

    rangeInput.addEventListener('input', (event) => {
        updateRangeLabel(event.target.value);
    });

    // Set initial label color
    updateRangeLabel(rangeInput.value);

    // Menangani klik pada kotak soal di grid
    gridItems.forEach((item) => {
        item.addEventListener('click', () => {
            const soalNumber = item.getAttribute('data-soal');
            currentSoal = parseInt(soalNumber);
            showSoal(currentSoal);
            updateSelection(item);
            updateButtons();
        });
    });

    // Menangani klik tombol Previous
    document.getElementById('prev-button').addEventListener('click', () => {
        if (currentSoal > 1) {
            currentSoal--;
            showSoal(currentSoal);
            updateSelection(document.querySelector(`.grid-item[data-soal="${currentSoal}"]`));
            updateButtons();
        }
    });

    // Menangani klik tombol Next
    document.getElementById('next-button').addEventListener('click', () => {
        if (currentSoal < totalSoal) {
            currentSoal++;
            showSoal(currentSoal);
            updateSelection(document.querySelector(`.grid-item[data-soal="${currentSoal}"]`));
            updateButtons();
        }
    });

    // Menangani klik tombol Submit
    document.getElementById('submit-button').addEventListener('click', () => {
        alert('Formulir dikirim atau diakhiri!');
        stopStopwatch();
        // Logika untuk mengakhiri survei atau mengirim data
    });

    // Menangani klik tombol Akhiri Sekarang
    document.getElementById('end-button').addEventListener('click', () => {
        stopStopwatch();
        alert('Survey telah diakhiri');
    });

    // Stopwatch
    startStopwatch();

    // Inisialisasi
    showSoal(currentSoal);
    updateSelection(document.querySelector(`.grid-item[data-soal="${currentSoal}"]`));
    updateButtons();
});
