import { useState, useEffect } from 'react';

export default function App() {
    const [progressoScroll, setProgressoScroll] = useState(0);

    useEffect(() => {
        const lidarComScroll = () => {
            const alturaTotal = document.documentElement.scrollHeight - window.innerHeight;
            const progresso = (window.scrollY / alturaTotal) * 100;
            setProgressoScroll(progresso);
        };

        window.addEventListener('scroll', lidarComScroll);
        return () => window.removeEventListener('scroll', lidarComScroll);
    }, []);

    const obterOpacidade = (inicio: number, fim: number, manterNoFim = false) => {
        if (progressoScroll < inicio) return 0;
        if (manterNoFim && progressoScroll >= inicio) {
            if (progressoScroll <= inicio + 10) {
                return (progressoScroll - inicio) / 10;
            }
            return 1;
        }
        if (progressoScroll > fim) return 0;
        if (progressoScroll >= inicio && progressoScroll <= inicio + 10) {
            return (progressoScroll - inicio) / 10;
        }
        if (progressoScroll >= fim - 10 && progressoScroll <= fim) {
            return (fim - progressoScroll) / 10;
        }
        return 1;
    };

    const obterEscala = (inicio: number, fim: number, manterNoFim = false) => {
        const opacidade = obterOpacidade(inicio, fim, manterNoFim);
        return 0.9 + (opacidade * 0.1);
    };

    return (
        <div className="container-principal">
            {/* Flocos de neve */}
            <div className="camada-neve">
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="floco-neve"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${8 + Math.random() * 7}s`,
                        }}
                    >
                        ❅
                    </div>
                ))}
            </div>

            {/* Estrelas piscando */}
            <div className="camada-estrelas">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="estrela"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`
                        }}
                    >
                        ✦
                    </div>
                ))}
            </div>

            {/* Seção 1: Título inicial */}
            <section className="secao-scroll">
                <div
                    className="conteudo-secao"
                    style={{
                        opacity: obterOpacidade(0, 30),
                        transform: `scale(${obterEscala(0, 30)})`
                    }}
                >
                    <h1 className="arvore-natal">🎄</h1>
                    <h2 className="titulo-principal">Feliz Natal!</h2>
                    <p className="texto-scroll">Role para baixo ↓</p>
                </div>
            </section>

            {/* Seção 2: Desejamos alegria */}
            <section className="secao-scroll">
                <div
                    className="conteudo-secao conteudo-mensagem"
                    style={{
                        opacity: obterOpacidade(25, 55),
                        transform: `scale(${obterEscala(25, 55)})`
                    }}
                >
                    <div className="emoji-grande">🎅</div>
                    <h2 className="titulo-secao">Desejamos alegria neste Natal!</h2>
                    <p className="texto-secao">
                        Que esta época seja repleta de amor, risadas e momentos que fazem o Natal especial.
                    </p>
                </div>
            </section>

            {/* Seção 3: Rena e presentes */}
            <section className="secao-scroll">
                <div
                    className="conteudo-secao"
                    style={{
                        opacity: obterOpacidade(50, 75),
                        transform: `scale(${obterEscala(50, 75)})`
                    }}
                >
                    <div className="grupo-emojis">
                        <span className="presente-animado" style={{animationDelay: '0s'}}>🎁</span>
                        <span className="rena">🦌</span>
                        <span className="presente-animado" style={{animationDelay: '0.3s'}}>🎁</span>
                    </div>
                    <h2 className="titulo-secao titulo-rena">
                        As renas trazem alegria e presentes!
                    </h2>
                    <p className="texto-magico">Cada momento é mágico ✨</p>
                </div>
            </section>

            {/* Seção 4: Mensagem final - NÃO SOME */}
            <section className="secao-scroll secao-final">
                <div
                    className="conteudo-secao conteudo-final"
                    style={{
                        opacity: obterOpacidade(70, 100, true),
                        transform: `scale(${obterEscala(70, 100, true)})`
                    }}
                >
                    <div className="cartao-natal">
                        <h2 className="titulo-cartao">
                            🎄 Feliz Natal! 🎄
                        </h2>

                        <p className="mensagem-principal">
                            Desejamos a você um Natal repleto de amor, paz e alegria!
                        </p>

                        <p className="mensagem-secundaria">
                            Boas férias e boas festas!
                        </p>

                        <div className="assinatura">
                            <p className="texto-assinatura">Com carinho,</p>
                            <p className="nome-assinatura">Fulano ❤️</p>
                        </div>

                        <div className="decoracao-final">
                            <span>🎄</span>
                            <span>⭐</span>
                            <span>🎁</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Barra de progresso */}
            <div className="barra-progresso-container">
                <div
                    className="barra-progresso"
                    style={{ width: `${progressoScroll}%` }}
                />
            </div>
        </div>
    );
}
