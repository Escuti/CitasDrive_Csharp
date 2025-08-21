function PatientsViewModel() {
    var self = this;

    const API_URL = "https://localhost:7127/api/Patient";

    self.patients = ko.observableArray([]);
    self.selectedPatient = ko.observable(null);

    self.formData = ko.mapping.fromJS({
        tipo_docum: "",
        num_docum: "",
        nombre: "",
        genero: "",
        fecha_nacim: "",
        num_celular: ""
    });

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
        self.resetForm();
        if (typeof modalViewModel !== 'undefined') {
            modalViewModel.showPatientModal();
        }
    };

    // Mostrar modal para editar
    self.editPatient = function (patient) {
        self.selectedPatient(patient);

        ko.mapping.fromJS(patient, self.formData);

        if (typeof modalViewModel !== 'undefined') {
            modalViewModel.showPatientModal(patient);
        }
    };

    // Guardar paciente (llamado desde el modal)
    self.savePatient = function () {
        const patientData = ko.mapping.toJS(self.formData);

        console.log("Guardando:", patientData);

        const isEditing = self.selectedPatient() !== null; //evaluar si hay id o no para usar PUT o POST
        const url = isEditing
            ? `${API_URL}/${self.selectedPatient().id_paciente}`
            : API_URL;
        const method = isEditing ? 'PUT' : 'POST';

        console.log("JSON a enviar:", JSON.stringify(patientData, null, 2));

        // conexión con API
        fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(patientData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    alert(isEditing ? 'Paciente actualizado' : 'Paciente guardado');
                    self.getPatients();
                    self.selectedPatient(null);
                } else {
                    alert('Error: ' + data.message);
                }
            })
            .catch(err => alert('Error: ' + err));
    };

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
        ko.mapping.fromJS({
            tipo_docum: "",
            num_docum: "",
            nombre: "",
            genero: "",
            fecha_nacim: "",
            num_celular: ""
        }, self.formData);

        self.selectedPatient(null);
    };

    self.getPatients();
}

var patientsViewModel = new PatientsViewModel();