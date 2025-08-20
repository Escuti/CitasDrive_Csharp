function ModalViewModel() {
    var self = this;

    // Mostrar modal de paciente
    self.showPatientModal = function (patientData = null) {
        const isEdit = patientData !== null;
        const title = isEdit ? 'Editar Paciente' : 'Agregar Paciente';

        const modalHTML = `
            <div class="modal fade" id="patientModal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${title}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <form id="patientForm">
                                <div class="mb-3">
                                    <label class="form-label">Tipo Documento</label>
                                    <select class="form-select" id="tipo_docum">
                                        <option value="">Seleccione</option>
                                        <option value="cédula">Cédula</option>
                                        <option value="pasaporte">Pasaporte</option>
                                        <option value="tarjeta de identidad">Tarjeta de Identidad</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Número Documento</label>
                                    <input type="text" class="form-control" id="num_docum">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Nombre</label>
                                    <input type="text" class="form-control" id="nombre">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Género</label>
                                    <select class="form-select" id="genero">
                                        <option value="">Seleccione</option>
                                        <option value="Masculino">Masculino</option>
                                        <option value="Femenino">Femenino</option>
                                        <option value="Otro">Otro</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Fecha Nacimiento</label>
                                    <input type="date" class="form-control" id="fecha_nacim">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Celular</label>
                                    <input type="text" class="form-control" id="num_celular">
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" class="btn btn-primary" onclick="patientsViewModel.savePatient()">Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('modal-container').innerHTML = modalHTML;

        // Llenar datos si es edición
        if (isEdit) {
            document.getElementById('tipo_docum').value = patientData.tipo_docum || '';
            document.getElementById('num_docum').value = patientData.num_docum || '';
            document.getElementById('nombre').value = patientData.nombre || '';
            document.getElementById('genero').value = patientData.genero || '';
            document.getElementById('fecha_nacim').value = patientData.fecha_nacim || '';
            document.getElementById('num_celular').value = patientData.num_celular || '';
        }

        const modal = new bootstrap.Modal(document.getElementById('patientModal'));
        modal.show();
    };
}

var modalViewModel = new ModalViewModel();