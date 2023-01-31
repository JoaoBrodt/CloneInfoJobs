const nacionalidade = document.querySelector(".nacionalidade");
const cpf = document.getElementById("cpf");
const tipoDocumento = document.getElementById("tipoDocumento");
const cep = document.getElementById("cep");
const numeroTelefone = document.getElementById("numeroTelefone");
const semNumero = document.getElementById("semNumero");
const numeroEndereco = document.getElementById("numeroEndereco");
const estadoEndereco = document.getElementById("estado");
const cidadeEndereco = document.getElementById("cidade");
const bairroEndereco = document.getElementById("bairro");
const enderecoEndereco = document.getElementById("endereco");

Inputmask({ mask: "999.999.999-99" }).mask(cpf);
Inputmask({ mask: "999.999-99" }).mask(cep);
Inputmask({ mask: "99999-9999" }).mask(numeroTelefone);

fetch("https://servicodados.ibge.gov.br/api/v1/localidades/paises?orderBy=nome")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`http error: status ${response.status}`);
    }
    return response.json();
  })
  .catch((error) => {
    alert(error.message);
  })
  .then((response) => {
    listapaises(response);
  });

fetch("https://viacep.com.br/ws/14051140/json/")
  .then(async (response) => {
    if (!response.ok) {
      throw new Error(`http error: status ${response.status}`);
    }
    return await response.json();
  })
  .catch((error) => {
    alert(error.message);
  })
  .then((response) => {
    defineEndereco(response);
  });

function listapaises(lista) {
  lista.forEach((elemento) => {
    cidade = elemento.nome;
    nacionalidade.innerHTML += `<option class="listanacionalidade" style="font-size=16">${cidade}</option> `;
  });
}

function defineEndereco(cep) {
  estadoEndereco.value = cep.uf;
  cidadeEndereco.value = cep.localidade;
  bairroEndereco.value = cep.bairro;
  enderecoEndereco.value = cep.logradouro;
}

semNumero.addEventListener("click", () => {
  numeroEndereco.value = "Sem número";
});
