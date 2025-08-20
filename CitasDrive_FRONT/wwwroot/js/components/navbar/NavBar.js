function NavBarViewModel() {
    var self = this;

    self.menuItems = ko.observableArray([
        { id: 'dashboard', name: 'Dashboard', icon: 'bi-house' },
        { id: 'patients', name: 'Pacientes', icon: 'bi-people' },
        { id: 'appointments', name: 'Citas', icon: 'bi-calendar' }
    ]);

    self.changeModule = function (module) {
        switch (module.id) {
            case 'dashboard':
                appViewModel.mostrarDashboard();
                break;
            case 'patients':
                appViewModel.mostrarPacientes();
                break;
            case 'appointments':
                appViewModel.mostrarCitas();
                break;
        }
    };
}

// Instancia global
var navBarViewModel = new NavBarViewModel();