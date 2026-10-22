import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, Instagram, Mail, Menu, Play, X } from "lucide-react";
import Pricing from "@/components/ui/pricing-02";
import { Button } from "@/components/ui/button";

const projects = [
  { id: "01", title: "Retrato em movimento", category: "Filme de marca", ratio: "16:9", summary: "Um retrato sensível sobre identidade, rotina e tudo o que acontece entre uma cena e outra." },
  { id: "02", title: "Matéria viva", category: "Moda & produto", ratio: "4:5", summary: "Textura, gesto e ritmo em uma narrativa curta criada para campanha digital." },
  { id: "03", title: "Antes da cidade", category: "Documental", ratio: "16:9", summary: "Um filme documental sobre quem começa o dia enquanto a cidade ainda dorme." },
  { id: "04", title: "Pulso", category: "Performance", ratio: "9:16", summary: "Corpo e câmera dividem o mesmo pulso em uma peça vertical de alta energia." },
  { id: "05", title: "Casa aberta", category: "Arquitetura", ratio: "16:9", summary: "Luz natural e silêncio contam a história de uma casa feita para permanecer." },
];

const nav = [
  ["Início", "#inicio"], ["Quem sou", "#quem-sou"], ["Por que vídeo", "#importancia"], ["Portfólio", "#portfolio"], ["Planos", "#planos"],
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null);
  const [sent, setSent] = useState(false);
  const portfolioRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const pageProgress = useSpring(scrollYProgress, { stiffness: 110, damping: 30, restDelta: 0.001 });
  const { scrollYProgress: portfolioProgress } = useScroll({ target: portfolioRef, offset: ["start start", "end end"] });
  const trackX = useTransform(portfolioProgress, [0, 1], ["0%", "-66%"]);

  useEffect(() => {
    document.body.style.overflow = selectedProject || menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedProject, menuOpen]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  };

  return (
    <main className="overflow-clip bg-[#0b0a09] text-white">
      <motion.div className="fixed left-0 top-0 z-[100] h-[2px] origin-left bg-[#f3a65a]" style={{ scaleX: pageProgress, width: "100%" }} />

      <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 md:px-8">
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-black/45 px-4 py-2.5 shadow-2xl backdrop-blur-2xl md:px-6" aria-label="Navegação principal">
          <a href="#inicio" className="font-display text-sm font-bold tracking-[0.12em]">MIGUEL<span className="text-[#f3a65a]">TENÓRIO</span></a>
          <div className="hidden items-center gap-7 lg:flex">
            {nav.map(([label, href]) => <a key={href} href={href} className="text-xs text-white/60 transition hover:text-white">{label}</a>)}
          </div>
          <Button asChild size="sm" className="hidden bg-white text-black hover:bg-[#f3a65a] lg:inline-flex"><a href="#contato">Vamos conversar</a></Button>
          <button className="grid size-9 place-items-center lg:hidden" aria-label="Abrir menu" onClick={() => setMenuOpen(true)}><Menu size={19} /></button>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] flex flex-col bg-[#0b0a09] p-6">
            <div className="flex justify-between"><span className="font-display font-bold">MIGUEL TENÓRIO</span><button aria-label="Fechar menu" onClick={() => setMenuOpen(false)}><X /></button></div>
            <div className="my-auto space-y-5">
              {nav.map(([label, href], i) => <motion.a key={href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * .06 }} href={href} onClick={() => setMenuOpen(false)} className="block font-display text-4xl font-medium">{label}</motion.a>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="inicio" className="relative flex min-h-screen flex-col justify-end overflow-hidden px-4 pb-10 pt-28 md:px-8 md:pb-12">
        <motion.img initial={{ scale: 1.06 }} animate={{ scale: 1 }} transition={{ duration: 1.4, ease: "easeOut" }} src="/images/miguel-tenorio-hero.png" alt="Miguel Tenório fotografando com uma câmera" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-[62%_center] md:object-center" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(8,7,6,.97)_0%,rgba(8,7,6,.88)_32%,rgba(8,7,6,.48)_58%,rgba(8,7,6,.12)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,4,.5)_0%,transparent_30%,rgba(5,5,4,.2)_64%,rgba(5,5,4,.88)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-black/10" />

        <div className="relative z-10 mx-auto w-full max-w-7xl pb-10 md:pb-14">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1, duration: .8 }} className="max-w-[820px] font-display text-[clamp(3.5rem,8vw,7.8rem)] font-semibold leading-[.86] tracking-[-.075em] [text-shadow:0_2px_32px_rgba(0,0,0,.35)]">Histórias<br />que pedem<br /><em className="font-normal text-[#f3a65a]">movimento.</em></motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .45 }} className="mt-7 max-w-md text-sm leading-7 text-white/75 [text-shadow:0_1px_18px_rgba(0,0,0,.8)] md:text-base">Transformo ideias em filmes que criam presença, despertam emoção e continuam ecoando depois do último frame.</motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .6 }} className="mt-8 flex flex-wrap items-center gap-3"><Button asChild size="lg" className="bg-[#f3a65a] text-[#160b04] hover:bg-[#ffc078]"><a href="#portfolio">Ver portfólio <ArrowDown className="ml-2 size-4" /></a></Button><Button asChild size="lg" variant="outline" className="border-white/25 bg-black/25 text-white backdrop-blur-md hover:bg-white/15"><a href="#contato">Contar uma ideia</a></Button><span className="ml-0 hidden items-center gap-3 rounded-full border border-white/15 bg-black/35 px-4 py-2.5 backdrop-blur-xl sm:flex md:ml-3"><span className="grid size-8 place-items-center rounded-full bg-white text-black"><Play className="ml-0.5 size-3.5 fill-current" /></span><span className="text-xs"><b className="block font-display">Showreel</b><span className="text-white/50">01:24 min</span></span></span></motion.div>
        </div>
        <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between border-t border-white/15 pt-5 text-[10px] uppercase tracking-[.18em] text-white/45"><span>Baseado no Brasil · Disponível para projetos</span><span className="hidden md:block">Role para descobrir</span></div>
      </section>

      <section id="quem-sou" className="relative bg-[#f6f5f2] text-[#191714]">
        <div className="relative overflow-hidden bg-[#eeece9]">
          <img
            src="/images/miguel-tenorio-about-banner.png"
            alt="Miguel Tenório em retrato preto e branco"
            loading="lazy"
            className="absolute inset-x-0 top-0 h-[440px] w-full object-cover object-[32%_center] md:h-full md:object-center"
          />
          <div className="pointer-events-none absolute inset-x-0 top-[360px] h-32 bg-gradient-to-b from-transparent to-[#f6f5f2] md:hidden" />
          <div className="relative mx-auto flex min-h-[730px] max-w-7xl items-end px-4 pb-10 pt-[390px] md:min-h-[680px] md:items-center md:justify-end md:px-8 md:py-20">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="w-full bg-[#f6f5f2]/95 px-7 py-9 shadow-[0_18px_70px_rgba(28,25,22,.11)] backdrop-blur-md sm:px-10 md:max-w-[560px] md:px-12 md:py-12"
            >
              <h2 className="font-display text-[clamp(2.25rem,4.1vw,3.75rem)] font-medium leading-[1.04] tracking-[-.055em]">
                Eu não registro apenas o que acontece. <span className="text-black/35">Eu encontro o que merece ser sentido.</span>
              </h2>
              <p className="mt-7 max-w-[440px] text-sm leading-7 text-black/60">
                Sou Miguel Tenório, videomaker apaixonado por narrativas honestas, luz natural e imagens que têm tempo para respirar. Trabalho da primeira conversa ao corte final, construindo uma linguagem visual própria para cada projeto.
              </p>
            </motion.div>
          </div>
        </div>
        <div className="mx-auto grid max-w-7xl border-t border-black/10 px-4 py-9 md:grid-cols-3 md:px-8 md:py-12">
          {[["01", "Direção com intenção", "Cada escolha visual nasce da mensagem — nunca do efeito pelo efeito."], ["02", "Processo próximo", "Escuta, repertório e colaboração para encontrar a forma certa da sua história."], ["03", "Entrega completa", "Conceito, roteiro, captação, edição e acabamento em um fluxo claro."]].map(([n, title, description]) => (
            <article key={n} className="border-b border-black/10 py-5 md:border-b-0 md:border-r md:px-8 md:py-0 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
              <span className="text-xs font-semibold text-[#c66d27]">{n}</span>
              <h3 className="mt-3 font-display text-lg font-medium">{title}</h3>
              <p className="mt-2 max-w-sm text-sm leading-6 text-black/50">{description}</p>
            </article>
          ))}
        </div>
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-black/15"><span className="absolute left-1/2 top-0 h-[3px] w-24 -translate-x-1/2 bg-[#d77c32]" /></div>
      </section>

      <section id="importancia" className="relative overflow-hidden bg-[#fffdf9] px-4 py-28 text-[#1c1008] md:px-8 md:py-40">
        <div className="pointer-events-none absolute -right-24 top-0 size-[520px] rounded-full bg-[#e9a564]/20 blur-[130px]" />
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
            <h2 className="font-display text-[clamp(3rem,7vw,7rem)] font-semibold leading-[.9] tracking-[-.065em]">A atenção passa.<br />A história <em className="font-normal text-[#c66d27]">fica.</em></h2>
            <p className="max-w-md text-base leading-7 opacity-65">Um bom vídeo não preenche espaço. Ele organiza percepção, cria confiança e transforma uma marca em algo que as pessoas conseguem lembrar — e sentir.</p>
          </div>
          <div className="mt-20 grid border-y border-black/15 md:grid-cols-3">
            {[["03s", "para criar uma primeira impressão"], ["80%", "do consumo digital passa pelo vídeo"], ["1 ideia", "pode virar uma narrativa memorável"]].map(([value, label], i) => <motion.div key={value} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .12 }} className="border-b border-black/15 py-10 md:border-b-0 md:border-r md:px-8 first:pl-0 last:border-r-0"><strong className="font-display text-5xl font-semibold text-[#b85f21]">{value}</strong><p className="mt-3 max-w-[220px] text-sm leading-6 opacity-55">{label}</p></motion.div>)}
          </div>
        </div>
      </section>

      <section ref={portfolioRef} id="portfolio" className="relative h-auto bg-[#0b0a09] px-4 py-24 md:px-8 lg:h-[300vh] lg:py-0">
        <div className="mx-auto max-w-7xl lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:overflow-hidden">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="font-display text-4xl font-medium md:text-6xl">Trabalhos selecionados</h2>
            <span className="hidden text-xs text-white/35 lg:block">Scroll para explorar →</span>
          </div>
          <motion.div style={{ x: trackX }} className="portfolio-track flex snap-x gap-5 overflow-x-auto pb-6 lg:w-max lg:overflow-visible">
            {projects.map((project, index) => (
              <article key={project.id} className="group w-[82vw] max-w-[430px] shrink-0 snap-center md:w-[430px]">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[26px] border border-white/10 bg-[#141311]">
                  <div className="absolute inset-0 grid place-items-center text-[10px] uppercase tracking-[.18em] text-white/20">Imagem do projeto · {project.ratio}</div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent p-6 pt-24">
                    <span className="text-[10px] uppercase tracking-[.17em] text-[#f3a65a]">{project.category}</span>
                    <h3 className="mt-2 font-display text-2xl font-medium">{project.title}</h3>
                    <button onClick={() => setSelectedProject(project)} className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-white/70 transition hover:text-white">Ver mais <ArrowUpRight size={14} /></button>
                  </div>
                  <span className="absolute right-5 top-5 text-xs text-white/25">{String(index + 1).padStart(2, "0")}</span>
                </div>
              </article>
            ))}
          </motion.div>
          <div className="mt-4 hidden h-px w-full bg-white/10 lg:block"><motion.div className="h-px bg-[#f3a65a]" style={{ scaleX: portfolioProgress, transformOrigin: "left" }} /></div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <motion.section role="dialog" aria-modal="true" aria-label={`Detalhes de ${selectedProject.title}`} initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 240 }} className="fixed inset-0 z-[90] overflow-y-auto bg-[#0d0c0a]">
            <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
              <button onClick={() => setSelectedProject(null)} className="mb-8 inline-flex items-center gap-2 text-sm text-white/55 hover:text-white"><ArrowLeft size={17} /> Voltar ao portfólio</button>
              <div className="grid min-h-[78vh] gap-10 lg:grid-cols-[1.25fr_.75fr] lg:items-center">
                <div className="aspect-video rounded-[28px] border border-white/10 bg-[#151412] grid place-items-center text-[10px] uppercase tracking-[.18em] text-white/20">Mídia do projeto · {selectedProject.ratio}</div>
                <div><span className="text-xs uppercase tracking-[.18em] text-[#f3a65a]">{selectedProject.category} · {selectedProject.id}</span><h2 className="mt-5 font-display text-5xl font-medium leading-none md:text-7xl">{selectedProject.title}</h2><p className="mt-7 max-w-md text-base leading-8 text-white/50">{selectedProject.summary}</p><div className="mt-10 grid grid-cols-2 gap-6 border-t border-white/10 pt-6 text-sm"><div><span className="block text-xs text-white/30">Papel</span><b className="mt-2 block font-normal">Direção e edição</b></div><div><span className="block text-xs text-white/30">Entrega</span><b className="mt-2 block font-normal">Filme principal + cortes</b></div></div></div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <section id="planos" className="relative px-4 py-28 md:px-8 md:py-40">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 grid gap-8 lg:grid-cols-2 lg:items-end"><h2 className="font-display text-4xl font-medium md:text-6xl">Conteúdo com ritmo.<br /><span className="text-white/30">Sem improviso.</span></h2><p className="max-w-md text-sm leading-7 text-white/45 lg:justify-self-end">Formatos temporários para orientar a proposta. Cada parceria é ajustada ao volume, complexidade e objetivos da sua marca.</p></div>
          <Pricing />
        </div>
      </section>

      <section id="contato" className="px-4 pb-8 pt-20 md:px-8 md:pt-28">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-white/10 bg-white/[.045] p-5 shadow-2xl backdrop-blur-xl md:p-10 lg:p-16">
          <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-orange-500/10 blur-[100px]" />
          <div className="relative grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
            <div><h2 className="font-display text-4xl font-medium leading-tight md:text-6xl">Tem uma história<br />em mente?</h2><p className="mt-6 max-w-sm text-sm leading-7 text-white/45">Conte um pouco sobre o projeto. Eu retorno com perguntas, possibilidades e os próximos passos.</p><div className="mt-12 space-y-4 text-sm"><a href="mailto:contato@migueltenorio.com.br" className="flex items-center gap-3 text-white/60 hover:text-white"><Mail size={17} /> contato@migueltenorio.com.br</a><a href="#" className="flex items-center gap-3 text-white/60 hover:text-white"><Instagram size={17} /> @migueltenorio</a></div></div>
            {sent ? (
              <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} className="grid min-h-[420px] place-items-center rounded-[24px] border border-white/10 bg-black/20 p-8 text-center"><div><CheckCircle2 className="mx-auto size-10 text-[#f3a65a]" /><h3 className="mt-5 font-display text-2xl">Mensagem recebida.</h3><p className="mt-3 text-sm text-white/45">Obrigado por compartilhar sua ideia. Retorno em breve.</p><button onClick={() => setSent(false)} className="mt-7 text-xs uppercase tracking-[.16em] text-[#f3a65a]">Enviar outra mensagem</button></div></motion.div>
            ) : (
              <form onSubmit={submit} className="grid gap-5 rounded-[24px] border border-white/10 bg-black/20 p-5 md:p-8">
                <div className="grid gap-5 sm:grid-cols-2"><label className="field"><span>Seu nome</span><input name="name" required placeholder="Como posso te chamar?" /></label><label className="field"><span>Seu e-mail</span><input type="email" name="email" required placeholder="voce@empresa.com" /></label></div>
                <label className="field"><span>Tipo de projeto</span><select name="project" defaultValue=""><option value="" disabled>Selecione uma opção</option><option>Filme de marca</option><option>Conteúdo mensal</option><option>Campanha</option><option>Evento</option><option>Outro</option></select></label>
                <label className="field"><span>Conte sobre a ideia</span><textarea name="message" required rows={5} placeholder="Objetivo, momento da marca, prazo..." /></label>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><p className="text-xs leading-5 text-white/30">Ao enviar, você concorda em ser contatado sobre este projeto.</p><Button type="submit" size="lg" className="shrink-0 bg-[#f3a65a] text-[#180d05] hover:bg-[#ffc078]">Enviar briefing <ArrowRight className="ml-2 size-4" /></Button></div>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="px-4 py-10 md:px-8"><div className="mx-auto flex max-w-7xl flex-col gap-5 border-t border-white/10 pt-7 text-xs text-white/30 sm:flex-row sm:items-center sm:justify-between"><span>© 2026 Miguel Tenório. Todos os direitos reservados.</span><div className="flex gap-5"><a href="#inicio" className="hover:text-white">Voltar ao topo</a><a href="#contato" className="hover:text-white">Contato</a></div></div></footer>
    </main>
  );
}

export default App;
