document.addEventListener('DOMContentLoaded', function () {
    console.log('CitasDrive iniciado');

    // Cargar componentes
    if (typeof navBarViewModel !== 'undefined') {
        navBarViewModel.loadNavbar().then(() => {
            // Aplicar bindings DESPUÉS de cargar el HTML
            ko.applyBindings(navBarViewModel, document.getElementById('navbar-container'));
        });
    }

    if (typeof topBarViewModel !== 'undefined') {
        topBarViewModel.loadTopbar().then(() => {
            ko.applyBindings(topBarViewModel, document.getElementById('topbar-container'));
        });
    }

    // Aplicar bindings al contenido principal
    if (typeof appViewModel !== 'undefined') {
        ko.applyBindings(appViewModel, document.body);
    }

    // Iniciar con dashboard
    if (typeof appViewModel !== 'undefined') {
        appViewModel.mostrarDashboard();
    }
});