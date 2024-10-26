document.addEventListener('DOMContentLoaded', () => {
    const clickBanana = document.getElementById('clickbanana');
    const saveButton = document.querySelector('.btn-nav2:nth-child(1)');
    const reiniciaButton = document.querySelector('.btn-nav2:nth-child(2)');
    const upgradeClickButton = document.getElementById("upgradeClick");
    const superClickbutton = document.getElementById("superClick");
    const vendasButtons = document.querySelectorAll(".vendas .btn-");

    let banana = 0;
    let points = 0;
    let autoClickEnabled = false;
    let clickMultiplier = 1;
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
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

    // Upgrade Auto Click   // Upgrade Super Click
    upgradeClickButton.addEventListener("click", function () {
        if (banana >= 10 && !autoClickEnabled) {
            banana -= 10;
            autoClickEnabled = true;
            pontuacao();
            setInterval(() => {
                banana += 1;
                pontuacao();
            }, 1000); // 1 pontos a cada segundo
        } else {
            alert("Pontos insuficientes ou upgrade já comprado!");
        }
    });
  
    superClickbutton.addEventListener("click", function () {
        if (banana >= 100) {
            banana -= 100;
            clickMultiplier = 2; // Dobra os pontos por clique
            pontuacao();
            alert("Upgrade aplicado: Super Click!");
        } else {
            alert("Pontos insuficientes!");
        }
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
