"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Check, Flame } from "lucide-react";
import { motion } from "motion/react";

type PricingPlan = {
  plan_name: string;
  plan_descp: string;
  plan_price: string;
  plan_feature: string[];
  plan_recommended: boolean;
};

const pricingData: PricingPlan[] = [
  {
    plan_name: "Essencial",
    plan_descp: "Para marcas que precisam começar a aparecer com consistência e intenção.",
    plan_price: "2.299,90",
    plan_feature: ["4 vídeos verticais", "1 captação mensal de até 2h", "Direção visual", "Calendário de conteúdo"],
    plan_recommended: false,
  },
  {
    plan_name: "Presença",
    plan_descp: "Produção recorrente para transformar ideias em presença audiovisual.",
    plan_price: "3.199,90",
    plan_feature: ["8 vídeos verticais", "2 captações mensais", "Roteiro e direção", "Edição profissional", "Relatório mensal"],
    plan_recommended: true,
  },
  {
    plan_name: "Autoridade",
    plan_descp: "Uma frente de conteúdo completa para marcas que desejam liderar conversas.",
    plan_price: "4.499,90",
    plan_feature: ["12 vídeos verticais", "3 captações mensais", "Estratégia de conteúdo", "Direção criativa", "Gestão de publicação"],
    plan_recommended: false,
  },
];

const Pricing = () => (
  <div className="grid gap-5 lg:grid-cols-3">
    {pricingData.map((plan, index) => {
      const isFeatured = plan.plan_recommended;
      return (
        <motion.div
          key={plan.plan_name}
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: index * 0.12, duration: 0.6 }}
          className={cn("relative flex", isFeatured && "lg:-translate-y-4")}
        >
          {isFeatured && <div className="absolute -inset-px rounded-[28px] bg-gradient-to-br from-amber-300 via-orange-500 to-rose-700 opacity-80 blur-[1px]" />}
          <Card className="relative flex w-full flex-col gap-7 rounded-[27px] border-white/10 bg-[#12100e]/95 p-7 text-white shadow-2xl backdrop-blur-xl">
            <CardHeader className="space-y-4 p-0">
              <div className="flex items-center justify-between gap-4">
                <CardTitle className="font-display text-xl font-semibold">{plan.plan_name}</CardTitle>
                {isFeatured && <Badge className="gap-1.5 bg-[#f3a65a] px-3 py-1 text-[#1b0e05]"><Flame size={14} /> Mais escolhido</Badge>}
              </div>
              <CardDescription className="min-h-12 text-sm leading-6 text-white/55">{plan.plan_descp}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-6 p-0">
              <div>
                <span className="mr-1 text-sm text-white/45">R$</span>
                <span className="font-display text-4xl font-semibold tracking-tight">{plan.plan_price}</span>
                <span className="text-sm text-white/45">/mês</span>
              </div>
              <p className="text-xs text-white/35">Contrato mínimo de 3 meses</p>
              <Separator className="bg-white/10" />
              <ul className="flex flex-1 flex-col gap-3.5">
                {plan.plan_feature.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm leading-5 text-white/70">
                    <Check className="mt-0.5 size-4 shrink-0 text-[#f3a65a]" />{feature}
                  </li>
                ))}
              </ul>
              <Button asChild variant={isFeatured ? "default" : "outline"} className={cn("h-12 w-full", isFeatured ? "bg-[#f3a65a] text-[#1b0e05] hover:bg-[#ffc078]" : "border-white/15 bg-white/[0.03] text-white hover:bg-white/10")}>
                <a href="#contato">Quero este plano</a>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      );
    })}
  </div>
);

export default Pricing;
