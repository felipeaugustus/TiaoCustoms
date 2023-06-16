const regexCinza = /^[A-Z]{3}-?\d{4}$/;
const regexMercosul = /^[A-Z]{3}\d[A-Z0-9]\d{2}$/;

class Service {
    constructor(brand, model, plate, year, date, budget, serviceType, description, client) {
        this.setBrand(brand);
        this.setModel(model);
        this.setPlate(plate);
        this.setYear(year);
        this.setDate(date);
        this.setBudget(budget);
        this.setServiceType(serviceType);
        this.setDescription(description);
        this.setClient(client);
        console.log(this);
    }

    setBrand(brand) {
        if (brand.length > 0) {
            this.brand = brand;
        } else {
            throw new Error("Marca não pode ser vazia")
        }
    }

    setModel(model) {
        if (model.length > 0) {
            this.model = model;
        } else {
            throw new Error("Modelo não pode ser vazio")
        }
    }

    setYear(year) {
        if (year.toString().length < 4 || year.toString().length > 4) {
            throw new Error("Ano com formatação inválida")
        } else {
            this.year = year;
        }
    }

    setDate(date) {
        if (date != "undefined/undefined/") {
            this.date = date;
        } else {
            throw new Error("Data não pode ser vazia")
        }
    }

    setBudget(budget) {
        if (!isNaN(budget)) {
            this.budget = budget;
        } else {
            throw new Error("Orçamento inválido")
        }
    }

    setServiceType(serviceType) {
        if (serviceType.length > 0) {
            this.serviceType = serviceType;
        } else {
            throw new Error("Tipo de serviço inválido")
        }
    }

    setDescription(description) {
        if (description.length > 0) {
            this.description = description;
        } else {
            throw new Error("Descrição não pode ser vazia")
        }
    }

    setClient(client) {
        // if (client.length > 0) {
        //     this.client = client;
        // } else {
        //     throw new Error("Cliente não pode ser vazio")
        // }
    }

    getPlate() {
        return this.plate;
    }

    setPlate(plate) {
        if (plateIsValid(plate)) {
            this.plate = plate;
        } else {
            throw new Error("Placa com formatação inválida");
        }
    }

    upsert() {
        if (localStorage.getItem(this.getPlate()) != null) {
            if (confirm("Um serviço com essa placa já existe, você irá atualiza-lo se prosseguir")) {
                deleteService(this.getPlate());
                localStorage.setItem(this.getPlate(), JSON.stringify(this));
                return true;
            } else {
                return false;
            }
        } else {
            localStorage.setItem(this.getPlate(), JSON.stringify(this));
            alert("Serviço cadastrado com êxito");
            return true;
        }
    }
}
export default Service;

function plateIsValid(plate) {
    if (regexCinza.test(plate) || regexMercosul.test(plate)) {
        return true;
    } else {
        return false;
    }
}

function getAllServices() {
    var vetor = [];
    for (var i = 0; i < localStorage.length; i++) {
        var chave = localStorage.key(i);
        if (regexCinza.test(chave) || regexMercosul.test(chave)) {
            var value = localStorage.getItem(chave);
            vetor.push(value);
        }
    }
    return vetor;
}

function deleteService(plate) {
    if (!plateIsValid(plate)) throw new Error("Placa com formatação inválida");
    if (localStorage.getItem(plate) != null) {
        localStorage.removeItem(plate);
    } else {
        throw new Error("Não existe um serviço cadastrado com essa placa");
    }
}

function populateTable() {
    const tableBody = document.querySelector("table tbody");
    if (!tableBody) return; // verifica se existe a tabela na pagina
    const services = getAllServices();

    tableBody.innerHTML = ""; // limpa tabela
    for (let index = 0; index < services.length; index++) {
        var row = document.createElement("tr");

        var checkBox = document.createElement("td");
        checkBox.classList.add("material-symbols-outlined")
        checkBox.textContent = "check_box_outline_blank";
        row.appendChild(checkBox);

        var modelCell = document.createElement("td");
        modelCell.textContent = JSON.parse(services[index]).model;
        row.appendChild(modelCell);

        var plateCell = document.createElement("td");
        plateCell.textContent = JSON.parse(services[index]).plate;
        row.appendChild(plateCell);

        var clientCell = document.createElement("td");
        clientCell.textContent = JSON.parse(services[index]).client;
        row.appendChild(clientCell);

        var dateCell = document.createElement("td");
        dateCell.textContent = JSON.parse(services[index]).date;
        row.appendChild(dateCell);

        var serviceTypeCell = document.createElement("td");
        serviceTypeCell.textContent = JSON.parse(services[index]).serviceType;
        row.appendChild(serviceTypeCell);

        var btnDelete = document.createElement("td");
        btnDelete.classList.add("material-symbols-outlined", "pointer", "delete-button")
        btnDelete.textContent = "delete";
        row.appendChild(btnDelete);

        tableBody.appendChild(row);
    }
}

if (sessionStorage.getItem("logged") !== "true") {
    window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", function () { // sera executado quando pagina carregar
    populateTable();

    var deleteButtons = document.querySelectorAll("td.delete-button");
    deleteButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const row = button.parentNode;
            const model = row.cells[1].textContent;
            const plate = row.cells[2].textContent;
            console.log(plate);
            if (confirm(`Você tem certeza que deseja deletar o serviço do carro ${model} placa ${plate}`)) {
                deleteService(plate);
                populateTable();
            }
        });
    });

    const tableRows = document.querySelectorAll("table tbody tr");
    tableRows.forEach((row) => {
        const plate = row.cells[2];
        plate.classList.add("pointer");
        plate.title = "Editar serviço"
        plate.addEventListener("click", (event) => {
            event.stopPropagation();
            const plate = row.cells[2].textContent;
            window.location.href = `vehicle.html?plate=${plate}`;
        });
    });
});


/*
const service1 = new Service('Toyota', 'Corolla', 'ABC1234', 2020, '29/05/2023', 1000, 'Manutenção', 'Troca de óleo', 'Zezinho');
const service2 = new Service('Honda', 'Civic', 'DEF8567', 2021, '15/06/2023', 1500, 'Revisão', 'Verificação geral', 'Maria');
const service3 = new Service('Ford', 'Mustang', 'GHI8901', 2019, '10/07/2023', 2000, 'Manutenção', 'Troca de filtros', 'João');
const service4 = new Service('Chevrolet', 'Onix', 'JKL2A34', 2020, '03/08/2023', 1200, 'Reparo', 'Substituição de peças', 'Ana');
const service5 = new Service('Volkswagen', 'Golf', 'MNO5B67', 2021, '20/09/2023', 1800, 'Manutenção', 'Alinhamento e balanceamento', 'Pedro');
const service6 = new Service('Fiat', 'Uno', 'PQR9501', 2019, '12/10/2023', 900, 'Revisão', 'Troca de velas', 'Carla');
const service7 = new Service('BMW', 'X5', 'STU2345', 2020, '05/11/2023', 2500, 'Manutenção', 'Troca de pastilhas de freio', 'Fernando');
const service8 = new Service('Mercedes-Benz', 'C-Class', 'VWX6789', 2021, '18/12/2023', 1600, 'Reparo', 'Conserto de sistema elétrico', 'Mariana');
const service9 = new Service('Audi', 'A4', 'YZA0123', 2019, '22/01/2024', 2200, 'Manutenção', 'Troca de correia dentada', 'Gustavo');
const service10 = new Service('Hyundai', 'HB20', 'BCD3456', 2020, '14/02/2024', 1300, 'Revisão', 'Verificação de freios', 'Camila');
const service11 = new Service('Nissan', 'Versa', 'EFG6789', 2021, '07/03/2024', 1900, 'Manutenção', 'Troca de bateria', 'Rafael');
const service12 = new Service('Kia', 'Sportage', 'HIJ0123', 2019, '25/04/2024', 1400, 'Reparo', 'Reparo de sistema de ar-condicionado', 'Patrícia');
*/