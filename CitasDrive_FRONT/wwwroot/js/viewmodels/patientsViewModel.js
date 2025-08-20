function PatientsViewModel() {
    var self = this;

    const API_URL = "https://localhost:7127/api/Patient";

    self.patients = ko.observableArray([]);
    self.selectedPatient = ko.observable(null);

    self.formData = {
        tipo_docum: ko.observable(""),
        num_docum: ko.observable(""),
        nombre: ko.observable(""),
        genero: ko.observable(""),
        fecha_nacim: ko.observable(""),
        num_celular: ko.observable("")
    };

    // Carga datos de BD
    self.getPatients = function () {
        console.log("Llamando a API:", API_URL);

        fetch(API_URL)
            .then(res => res.json())
            .then(data => {
                console.log("Datos recibidos:", data);
                if (data.success) {
                    console.log("Pacientes asignados al observableArray");
                    self.patients(data.data);

                    // pruebas de consola
                    console.log("patients() ahora tiene:", self.patients().length, "elementos");
                    console.log("Primer paciente:", self.patients()[0]);
                }
            })
            .catch(err => console.error("Error:", err));
    };

    // form para add nuevo paciente
    self.showAddForm = function () {
        if (typeof modalViewModel !== 'undefined') {
            modalViewModel.showPatientModal();
        }
    };

    // Mostrar modal para editar
    self.editPatient = function (patient) {
        if (typeof modalViewModel !== 'undefined') {
            modalViewModel.showPatientModal(patient);
        }
    };

    // Guardar paciente (llamado desde el modal)
    self.savePatient = function () {
        const patientData = {
            tipo_docum: document.getElementById('tipo_docum').value,
            num_docum: document.getElementById('num_docum').value,
            nombre: document.getElementById('nombre').value,
            genero: document.getElementById('genero').value,
            fecha_nacim: document.getElementById('fecha_nacim').value,
            num_celular: document.getElementById('num_celular').value
        };

        console.log("Guardando:", patientData);

        // Aquí va tu lógica de guardado en la API
        fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(patientData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    alert('Paciente guardado');
                    self.getPatients();
                } else {
                    alert('Error: ' + data.message);
                }
            })
            .catch(err => alert('Error: ' + err));
    };

    // Eliminar paciente
    self.deletePatient = function (patient) {
        if (confirm(`¿Estás seguro de eliminar al paciente ${patient.nombre}?`)) {
            fetch(`${API_URL}/${patient.id_paciente}`, { method: "DELETE" })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        alert("Paciente eliminado");
                        self.getPatients();
                    } else {
                        alert("Error: " + data.message);
                    }
                })
                .catch(err => alert("Error eliminando paciente: " + err));
        }
    };

    // Limpiar form
    self.resetForm = function () {
        self.formData.tipo_docum("");
        self.formData.num_docum("");
        self.formData.nombre("");
        self.formData.genero("");
        self.formData.fecha_nacim("");
        self.formData.num_celular("");
    };
}

var patientsViewModel = new PatientsViewModel();