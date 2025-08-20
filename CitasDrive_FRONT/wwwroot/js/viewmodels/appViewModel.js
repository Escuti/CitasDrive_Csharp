function AppViewModel() {
    var self = this;

    self.mostrarDashboard = function () {
        document.getElementById("main-content").innerHTML = `
            <div class="p-4">
                <h1>Bienvenido a CitasDrive</h1>
                <p class="lead">Selecciona un módulo desde el menú de la izquierda.</p>
            </div>
        `;
    };

    self.mostrarPacientes = function () {
        document.getElementById("main-content").innerHTML = `
        <div class="p-4">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h1>Módulo de Pacientes</h1>
                <button class="btn btn-primary" onclick="patientsViewModel.showAddForm()">
                    <i class="bi bi-plus-circle"></i> Agregar Paciente
                </button>
            </div>
            <div id="patients-table-container"></div>
        </div>
    `;

        fetch('js/views/patientsView.html')
            .then(res => res.text())
            .then(html => {
                const container = document.getElementById('patients-table-container');
                if (container) {
                    container.innerHTML = html;

                    ko.applyBindings(patientsViewModel, container);

                    patientsViewModel.getPatients();
                }
            });
    };

    self.mostrarCitas = function () {
        document.getElementById("main-content").innerHTML = `
            <div class="p-4">
                <h1>Módulo de Citas</h1>
                <div class="alert alert-info mt-3">
                    Módulo de citas en desarrollo.
                </div>
            </div>
        `;
    };

    self.mostrarDashboard();
}

var appViewModel = new AppViewModel();