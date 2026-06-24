const divMembers = document.getElementById("members");

async function loadMembers() {
  try {
    const response = await fetch("./src/js/members.json");
    const dados = await response.json();

    dados.members.forEach((element) => {
      divMembers.innerHTML += `<div class="member-card">
          <div class="member-photo-container">
            <img
              src="./src/img/members/${element.img}"
              alt="Foto do Integrante"
              class="member-photo"
            />
          </div>

          <div class="member-info">
            <span class="member-year">${element.year}</span>
            <h3 class="member-name">${element.name}</h3>
            <p class="member-course">${element.course}</p>
          </div>
        </div>`;
    });
  } catch (error) {
    console.error("Erro ao carregar o arquivo dos moradores:", error);
  }
}

loadMembers();