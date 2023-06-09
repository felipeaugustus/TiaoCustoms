import Service from './vehicle-list.js';

if (sessionStorage.getItem("logged") !== "true") {
    window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", function () { // sera executado quando pagina carregar
    const cadastrarBtn = document.querySelector("button[type='button']");
    cadastrarBtn.addEventListener("click", function () { // evento clique botao cadastrar
        const marca = document.getElementById("marca").value;
        const modelo = document.getElementById("modelo").value;
        const placa = document.getElementById("placa").value;
        const ano = parseInt(document.getElementById("ano").value);
        const dtEntrada = document.getElementById("dtEntrada").value;
        const servicos = document.getElementById("servicos").value;
        const dsServico = document.getElementById("descricao").value;
        const orcamento = parseFloat(document.getElementById("orcamento").value);
        const cliente = document.getElementById("cliente").value;

        const parts = dtEntrada.split('-'); // formata padrao BR
        const dtEntradaFormat = `${parts[2]}/${parts[1]}/${parts[0]}`;
        try {
            const service = new Service(marca, modelo, placa, ano, dtEntradaFormat, orcamento, servicos, dsServico, cliente);
            if (service.upsert()) {
                document.getElementById("marca").value = "";
                document.getElementById("modelo").value = "";
                document.getElementById("placa").value = "";
                document.getElementById("ano").value = "";
                document.getElementById("dtEntrada").value = "";
                document.getElementById("orcamento").value = "";
                document.getElementById("servicos").value = "";
                document.getElementById("descricao").value = "";
                document.getElementById("cliente").value = "";
            }
        } catch (error) {
            alert(`Erro ao cadastrar veículo: ${error.message}`); 7
            console.error(error)
        }
    });

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("plate") != null) { // pega as info pra editar veiculo
        const vehicle = JSON.parse(localStorage.getItem(urlParams.get("plate")));
        document.getElementById("marca").value = vehicle.brand;
        document.getElementById("modelo").value = vehicle.model;
        document.getElementById("placa").value = vehicle.plate;
        document.getElementById("ano").value = vehicle.year;
        document.getElementById("orcamento").value = vehicle.budget;
        document.getElementById("servicos").value = vehicle.serviceType;
        document.getElementById("descricao").value = vehicle.description;
        document.getElementById("cliente").value = vehicle.client;

        vehicle.date = vehicle.date.split('/'); // formata padrao US
        let day = vehicle.date[0];
        let month = vehicle.date[1];
        let year = vehicle.date[2];
        vehicle.date = year + '-' + month + '-' + day;
        document.getElementById("dtEntrada").value = vehicle.date;
    }
});