document.addEventListener('DOMContentLoaded', function () {

    // BUSCA POR PALAVRA-CHAVE
    const campoBusca = document.getElementById('campoBusca');
    const resultadoBusca = document.getElementById('resultadoBusca');

    campoBusca.addEventListener('input', function () {
        const termo = this.value.trim().toLowerCase();

        document.querySelectorAll('mark.destaque-busca').forEach(el => {
            el.replaceWith(document.createTextNode(el.textContent));
        });

        if (termo.length < 2) {
            resultadoBusca.textContent = '';
            return;
        }

        const seletores = ['p', 'h2', 'h3', 'h4', 'li', 'dt', 'dd', 'td'];
        let total = 0;

        seletores.forEach(tag => {
            document.querySelectorAll(tag).forEach(el => {
                el.childNodes.forEach(node => {
                    if (
                        node.nodeType === Node.TEXT_NODE &&
                        node.textContent.toLowerCase().includes(termo)
                    ) {
                        const partes = node.textContent.split(
                            new RegExp(`(${termo})`, 'gi')
                        );

                        const fragmento = document.createDocumentFragment();

                        partes.forEach(parte => {
                            if (parte.toLowerCase() === termo) {
                                const mark = document.createElement('mark');
                                mark.className = 'destaque-busca';
                                mark.style.cssText =
                                    'background:gold; color:#000080; border-radius:3px; padding:0 2px;';
                                mark.textContent = parte;
                                fragmento.appendChild(mark);
                                total++;
                            } else {
                                fragmento.appendChild(
                                    document.createTextNode(parte)
                                );
                            }
                        });

                        node.replaceWith(fragmento);
                    }
                });
            });
        });

        resultadoBusca.textContent =
            total > 0
                ? `✅ ${total} resultado(s) encontrado(s)`
                : '❌ Nada encontrado';
    });

    // VALIDAÇÃO DE FORMULÁRIO
    const form = document.getElementById('formContato');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const nome = document.getElementById('campoNome');
            const email = document.getElementById('campoEmail');
            const mensagem = document.getElementById('campoMensagem');

            const erroNome = document.getElementById('erroNome');
            const erroEmail = document.getElementById('erroEmail');
            const erroMensagem = document.getElementById('erroMensagem');

            let valido = true;

            [erroNome, erroEmail, erroMensagem].forEach(
                el => (el.textContent = '')
            );

            [nome, email, mensagem].forEach(
                el => (el.style.border = '')
            );

            if (nome.value.trim().length < 3) {
                erroNome.textContent =
                    '⚠️ Nome deve ter ao menos 3 caracteres.';
                nome.style.border = '2px solid red';
                valido = false;
            }

            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!regexEmail.test(email.value.trim())) {
                erroEmail.textContent =
                    '⚠️ Digite um e-mail válido.';
                email.style.border = '2px solid red';
                valido = false;
            }

            if (mensagem.value.trim().length < 10) {
                erroMensagem.textContent =
                    '⚠️ Mensagem deve ter ao menos 10 caracteres.';
                mensagem.style.border = '2px solid red';
                valido = false;
            }

            if (valido) {
                alert(
                    '✅ Mensagem enviada com sucesso! Obrigado, ' +
                    nome.value.trim() +
                    '!'
                );
                form.reset();
            }
        });
    }

    // ANIMAÇÃO AO SCROLL
    const elementosFade = document.querySelectorAll('.fade-in');

    const observador = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visivel');
            }
        });
    }, { threshold: 0.15 });

    elementosFade.forEach(el => observador.observe(el));

});
