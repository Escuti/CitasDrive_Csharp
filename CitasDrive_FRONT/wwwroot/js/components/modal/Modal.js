function ModalViewModel() {
    var self = this;

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
                                    <select class="form-select" data-bind="value: formData.tipo_docum">
                                        <option value="">Seleccione</option>
                                        <option value="cédula">Cédula</option>
                                        <option value="tarjeta de identidad">Tarjeta de Identidad</option>
                                        <option value="pasaporte">Pasaporte</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Número Documento</label>
                                    <input type="text" class="form-control" data-bind="value: formData.num_docum">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Nombre</label>
                                    <input type="text" class="form-control" data-bind="value: formData.nombre">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Género</label>
                                    <select class="form-select" data-bind="value: formData.genero">
                                        <option value="">Seleccione</option>
                                        <option value="Masculino">Masculino</option>
                                        <option value="Femenino">Femenino</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Fecha Nacimiento</label>
                                    <input type="date" class="form-control" data-bind="value: formData.fecha_nacim">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Celular</label>
                                    <input type="text" class="form-control" data-bind="value: formData.num_celular">
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" class="btn btn-primary" data-bind="click: savePatient" data-bs-dismiss="modal">Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('modal-container').innerHTML = modalHTML;

        // ✅ APPLY BINDINGS SEGURO
        const container = document.getElementById('modal-container');
        ko.cleanNode(container); // ← Limpiar antes de aplicar
        ko.applyBindings(patientsViewModel, container);

        // ✅ LLENAR DATOS CON KO MAPPING (no manual)
        if (isEdit) {
            ko.mapping.fromJS(patientData, patientsViewModel.formData);
        }

        const modal = new bootstrap.Modal(document.getElementById('patientModal'));
        modal.show();
    };
}

var modalViewModel = new ModalViewModel();