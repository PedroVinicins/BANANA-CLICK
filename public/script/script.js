document.addEventListener('DOMContentLoaded', () => {
    const clickBanana = document.getElementById('clickbanana');
    const saveButton = document.querySelector('.btn-nav2:nth-child(1)');
    const reiniciaButton = document.querySelector('.btn-nav2:nth-child(2)');
    const upgradeClickButton = document.getElementById("upgradeClick");
    const upgradeBananaButton = document.getElementById("upgradeBanana");
    const vendasButtons = document.querySelectorAll(".vendas .btn-");

    let banana = 0;
    let points = 0;
    let autoClickEnabled = false;
    let clickMultiplier = 1;

    // Atualiza a pontuação na tela
    function pontuacao() {
        document.querySelector('.btn-nav:nth-child(1)').innerText = `🍌: ${banana}`;
    }

    // Evento de clique para aumentar pontos de banana
    clickBanana.addEventListener('click', () => {
        banana += clickMultiplier;
        pontuacao();
    });

    // Carregar progresso do localStorage
    function carregarProgresso() {
        const progressoSalvo = localStorage.getItem('bananaProgresso');
        if (progressoSalvo) {
            const progresso = JSON.parse(progressoSalvo);
            banana = progresso.pontos;
            pontuacao();
        }
    }

    // Upgrade Auto Click
    upgradeClickButton.addEventListener("click", function () {
        if (banana >= 10 && !autoClickEnabled) {
            banana -= 10;
            autoClickEnabled = true;
            pontuacao();
            setInterval(() => {
                banana += 1;
                pontuacao();
            }, 1000); // Adiciona 1 ponto automaticamente a cada segundo
        } else {
            alert("Pontos insuficientes ou upgrade já comprado!");
        }
    });

    // Upgrade Super Click
    upgradeBananaButton.addEventListener("click", function () {
        if (banana >= 100) {
            banana -= 100;
            clickMultiplier = 2; // Dobra os pontos por clique
            pontuacao();
            alert("Upgrade aplicado: Super Click!");
        } else {
            alert("Pontos insuficientes!");
        }
    });

    // Evento de compra para itens da seção de vendas
    vendasButtons.forEach(button => {
        button.addEventListener("click", function () {
            const itemPrice = parseInt(this.innerText.split('- ')[1]);
            if (banana >= itemPrice) {
                banana -= itemPrice;
                pontuacao();
                alert(`Você comprou ${this.innerText.split(' - ')[0]}!`);
            } else {
                alert("Pontos insuficientes!");
            }
        });
    });

    // Salvar progresso
    saveButton.addEventListener('click', () => {
        const progresso = {
            pontos: banana
        };
        localStorage.setItem('bananaProgresso', JSON.stringify(progresso));
        alert('Progresso salvo com sucesso!');
    });

    // Reiniciar progresso
    reiniciaButton.addEventListener('click', function() {
        banana = 0;
        clickMultiplier = 1;
        autoClickEnabled = false;
        pontuacao();
        localStorage.removeItem('bananaProgresso');
        alert('Progresso reiniciado!');
    });

    carregarProgresso();
});
