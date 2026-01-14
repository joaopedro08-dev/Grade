"use client"

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { SheetDescription } from "./ui/sheet";
import { containerVariants, itemVariants } from "@/constants/animates";

export default function Terms({ children }: { children?: React.ReactNode }) {
    const currentYear = new Date().getFullYear();

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] sm:max-w-125 p-0 overflow-hidden flex flex-col max-h-[85vh] gap-0 border-primary/20 shadow-2xl">

                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                >
                    <DialogHeader className="p-6 pb-4 border-b bg-muted/20 text-left">
                        <DialogTitle className="text-2xl font-black uppercase italic tracking-tighter">
                            Sobre o Projeto
                        </DialogTitle>
                        <DialogDescription className="text-[10px] uppercase font-bold text-primary tracking-widest">
                            Aplicação de Demonstração Técnica
                        </DialogDescription>
                    </DialogHeader>
                </motion.div>

                <ScrollArea className="flex-1 px-6 py-4">
                    <motion.div
                        className="space-y-6 pb-6 text-sm text-muted-foreground leading-relaxed"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.section variants={itemVariants} className="space-y-2">
                            <h4 className="font-bold text-foreground uppercase text-[11px] tracking-widest flex items-center gap-2">
                                <span className="h-1 w-1 bg-primary rounded-full" />
                                Objetivo
                            </h4>
                            <p>
                                O <strong>Grade</strong> foi desenvolvido para demonstrar competência técnica na criação de interfaces modernas, performáticas e acessíveis.
                            </p>
                        </motion.section>

                        <motion.section variants={itemVariants} className="space-y-2">
                            <h4 className="font-bold text-foreground uppercase text-[11px] tracking-widest flex items-center gap-2">
                                <span className="h-1 w-1 bg-primary rounded-full" />
                                Stack Técnica
                            </h4>
                            <p>
                                Utiliza <strong>Next.js 16 (Turbopack)</strong>, <strong>TypeScript</strong> para tipagem estática e <strong>Tailwind CSS</strong> para estilização. Os componentes seguem os padrões do Radix UI via Shadcn/UI.
                            </p>
                        </motion.section>

                        <motion.section
                            variants={itemVariants}
                            className="space-y-2 text-xs opacity-80 border-l-2 pl-4 italic"
                        >
                            Nota: Esta plataforma não é oficial. Não há coleta de dados ou fins lucrativos envolvidos nesta aplicação.
                        </motion.section>
                    </motion.div>
                </ScrollArea>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="p-5 bg-muted/50 border-t mt-auto"
                >
                    <SheetDescription className="text-sm m-auto">
                        © {currentYear} <span className="font-black">Grade</span> • Desenvolvido por João Pedro Dala Dea Mello
                    </SheetDescription>
                </motion.div>
            </DialogContent>
        </Dialog>
    );
}