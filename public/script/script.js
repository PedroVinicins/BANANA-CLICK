
// Variáveis
const clickBanana = document.getElementById('clickbanana');
const configButton = document.querySelector('.btn-nav:nth-child(1)');
const rebirthButton = document.querySelector('.btn-nav:nth-child(2)');
const saveButton = document.querySelector('.btn-nav:nth-child(3)');
const upgradeBananaButton = document.getElementById('upgradeBanana');
let banana = 0;
let pontos = 0;

/////////////////////////////////////////////////////////////////////////////////////////////////

// ao clicar na imagem vai acrescentar a banana

function pontuacao(){
    document.querySelector('.btn-nav:nth-child(4)').innerText = `Bananas : ${banana}`;
}
    
clickbanana.addEventListener('click', function() {
    banana++;
    pontuacao();
});

/////////////////////////////////////////////////////////////////////////////////////////////////

function carregarProgresso() {
    const progressoSalvo = localStorage.getItem('bananaProgresso');
    if (progressoSalvo) {
        const progresso = JSON.parse(progressoSalvo);
        banana = progresso.pontos; // Atualiza a quantidade de bananas com o progresso salvo
        pontuacao(); // Atualiza a interface com a pontuação
    }

}


saveButton.addEventListener('click', function() {
    const progresso = {
        pontos: banana
    };
    localStorage.setItem('bananaProgresso', JSON.stringify(progresso)); // Salva no localStorage
    alert('Progresso salvo com sucesso!');
});




carregarProgresso();
