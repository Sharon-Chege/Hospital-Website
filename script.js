// ==============================
// Interactive Patient Dashboard
// ==============================

document.addEventListener('DOMContentLoaded', () => {

    const addBtn = document.getElementById('addPatientBtn');
    const modal = document.getElementById('patientModal');
    const closeBtn = document.querySelector('.close');
    const dashboardForm = document.getElementById('dashboardForm');
    const patientTableBody = document.querySelector('#patientTable tbody');
    const searchInput = document.getElementById('searchInput');

    let patients = [];

    // Open modal
    addBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        dashboardForm.reset();
    });

    window.addEventListener('click', (e) => {
        if(e.target === modal) {
            modal.style.display = 'none';
            dashboardForm.reset();
        }
    });

    // Add patient
    dashboardForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newPatient = {
            surname: document.getElementById('modalSurname').value.trim(),
            firstName: document.getElementById('modalFirstName').value.trim(),
            middleName: document.getElementById('modalMiddleName').value.trim(),
            gender: document.getElementById('modalGender').value
        };

        patients.push(newPatient);
        renderTable();
        modal.style.display = 'none';
        dashboardForm.reset();
    });

    // Render patient table
    function renderTable() {
        patientTableBody.innerHTML = '';
        patients.forEach((patient, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${patient.surname}</td>
                <td>${patient.firstName}</td>
                <td>${patient.middleName}</td>
                <td>${patient.gender}</td>
                <td>
                    <button class="edit" onclick="editPatient(${index})">Edit</button>
                    <button class="delete" onclick="deletePatient(${index})">Delete</button>
                </td>
            `;
            patientTableBody.appendChild(tr);
        });

        // Update stats
        document.getElementById('totalPatients').textContent = patients.length;
        document.getElementById('totalAppointments').textContent = patients.length * 2; // example
        document.getElementById('totalSurgeries').textContent = patients.length; // example
    }

    // Delete patient
    window.deletePatient = function(index) {
        if(confirm('Are you sure you want to delete this patient?')) {
            patients.splice(index, 1);
            renderTable();
        }
    }

    // Edit patient
    window.editPatient = function(index) {
        const patient = patients[index];
        modal.style.display = 'flex';
        document.getElementById('modalSurname').value = patient.surname;
        document.getElementById('modalFirstName').value = patient.firstName;
        document.getElementById('modalMiddleName').value = patient.middleName;
        document.getElementById('modalGender').value = patient.gender;

        // Remove previous event listener
        const newForm = dashboardForm.cloneNode(true);
        dashboardForm.parentNode.replaceChild(newForm, dashboardForm);

        newForm.addEventListener('submit', (e) => {
            e.preventDefault();
            patients[index] = {
                surname: document.getElementById('modalSurname').value.trim(),
                firstName: document.getElementById('modalFirstName').value.trim(),
                middleName: document.getElementById('modalMiddleName').value.trim(),
                gender: document.getElementById('modalGender').value
            };
            modal.style.display = 'none';
            renderTable();
        });
    }

    // Search patients
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const filtered = patients.filter(p => 
            p.surname.toLowerCase().includes(query) ||
            p.firstName.toLowerCase().includes(query) ||
            p.middleName.toLowerCase().includes(query) ||
            p.gender.toLowerCase().includes(query)
        );

        patientTableBody.innerHTML = '';
        filtered.forEach((patient, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${patient.surname}</td>
                <td>${patient.firstName}</td>
                <td>${patient.middleName}</td>
                <td>${patient.gender}</td>
                <td>
                    <button class="edit" onclick="editPatient(${index})">Edit</button>
                    <button class="delete" onclick="deletePatient(${index})">Delete</button>
                </td>
            `;
            patientTableBody.appendChild(tr);
        });
    });

});
