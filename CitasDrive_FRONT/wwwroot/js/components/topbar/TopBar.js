function TopBarViewModel() {
    var self = this;

    self.logout = function () {
        console.log("Logout clicked");
    };

    self.loadTopbar = function () {
        return fetch('js/components/topbar/TopBar.html')
            .then(response => response.text())
            .then(html => {
                const container = document.getElementById('topbar-container');
                if (container) {
                    container.innerHTML = html;
                }
                return true;
            });
    };

    // Inicializar
    self.loadTopbar();
}

var topBarViewModel = new TopBarViewModel();