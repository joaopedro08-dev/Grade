"use client"

import { useState } from "react";
import { CircleAlert, LayoutGrid, Menu, Hash, Layers, Layout, X } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose
} from "@/components/ui/sheet";
import Terms from "./terms";
import { motion } from "framer-motion";
import { headerVariants } from "@/constants/animates";

interface HeaderProps {
    onModeChange: (mode: 1 | 2 | 4) => void;
}

export default function Header({ onModeChange }: HeaderProps) {
    const [open, setOpen] = useState(false);

    const handleModeSelection = (value: string) => {
        const modeMap: Record<string, 1 | 2 | 4> = { termo: 1, dueto: 2, quarteto: 4 };
        onModeChange(modeMap[value]);
        setOpen(false);
    };

    return (
        <motion.header
            variants={headerVariants}
            initial="hidden"
            animate="visible"
            className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur"
        >
            <div className="container mx-auto flex h-16 xl:h-20 items-center justify-between px-4">
                <div className="flex items-center gap-2 xl:gap-4">
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden h-9 w-9 text-foreground">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>

                        <SheetContent 
                            side="left" 
                            showCloseButton={false} 
                            className="w-75 bg-background p-0 text-foreground pb-[env(safe-area-inset-bottom)]"
                        >
                            <div className="flex flex-col h-full pt-[env(safe-area-inset-top)]">
                                
                                <div className="flex items-center justify-between h-16 px-6 border-b shrink-0">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-primary p-1.5 rounded-lg shadow-sm">
                                            <LayoutGrid className="h-5 w-5 text-primary-foreground" />
                                        </div>
                                        <span className="text-xl font-black tracking-tighter uppercase italic">Grade</span>
                                    </div>
                                    
                                    <SheetClose asChild>
                                        <Button variant="ghost" size="icon" className="h-9 w-9 opacity-70">
                                            <X className="h-5 w-5" />
                                        </Button>
                                    </SheetClose>
                                </div>

                                <SheetHeader className="sr-only">
                                    <SheetTitle>Menu Grade</SheetTitle>
                                    <SheetDescription>Selecione o modo de jogo</SheetDescription>
                                </SheetHeader>

                                <div className="p-6 flex-1">
                                    <span className="text-[10px] font-black uppercase opacity-40 px-1 mb-4 block tracking-[0.2em]">Escolha o modo</span>
                                    <div className="flex flex-col w-full gap-3">
                                        <Button variant="outline" className="w-full justify-start gap-4 p-4 h-auto rounded-xl border bg-muted/50 transition-all" onClick={() => handleModeSelection("termo")}>
                                            <Hash className="h-5 w-5" />
                                            <span className="font-bold uppercase text-xs ml-2">Termo</span>
                                        </Button>
                                        <Button variant="outline" className="w-full justify-start gap-4 p-4 h-auto rounded-xl border bg-muted/50 transition-all" onClick={() => handleModeSelection("dueto")}>
                                            <Layers className="h-5 w-5" />
                                            <span className="font-bold uppercase text-xs ml-2">Dueto</span>
                                        </Button>
                                        <Button variant="outline" className="w-full justify-start gap-4 p-4 h-auto rounded-xl border bg-muted/50 transition-all" onClick={() => handleModeSelection("quarteto")}>
                                            <Layout className="h-5 w-5" />
                                            <span className="font-bold uppercase text-xs ml-2">Quarteto</span>
                                        </Button>
                                    </div>
                                </div>

                                <div className="p-6 mt-auto">
                                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 text-center">
                                        <p className="text-[10px] font-bold text-primary uppercase leading-tight opacity-70">
                                            Novo desafio disponível todos os dias à meia-noite.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>

                    <div className="hidden md:flex items-center gap-2 xl:gap-4">
                        <div className="bg-primary p-1.5 xl:p-2.5 rounded-lg xl:rounded-xl shadow-sm">
                            <LayoutGrid className="h-5 w-5 xl:h-7 xl:w-7 text-primary-foreground" />
                        </div>
                        <h1 className="text-xl xl:text-3xl font-black tracking-tighter uppercase italic">Grade</h1>
                    </div>
                    <h1 className="md:hidden text-xl font-black tracking-tighter uppercase italic">Grade</h1>
                </div>

                <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">
                    <Tabs defaultValue="termo" className="w-auto" onValueChange={handleModeSelection}>
                        <TabsList className="grid w-full grid-cols-3 h-9 xl:h-12 p-1 bg-muted/80 border shadow-sm">
                            <TabsTrigger value="termo" className="px-4 xl:px-8 text-[10px] xl:text-sm font-bold uppercase transition-all">Termo</TabsTrigger>
                            <TabsTrigger value="dueto" className="px-4 xl:px-8 text-[10px] xl:text-sm font-bold uppercase transition-all">Dueto</TabsTrigger>
                            <TabsTrigger value="quarteto" className="px-4 xl:px-8 text-[10px] xl:text-sm font-bold uppercase transition-all">Quarteto</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                <div className="flex items-center gap-1 xl:gap-4">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Terms>
                                    <Button variant="ghost" size="icon" className="h-9 w-9 xl:h-12 xl:w-12 rounded-full">
                                        <CircleAlert className="h-4 w-4 xl:h-6 xl:w-6 text-muted-foreground" />
                                    </Button>
                                </Terms>
                            </TooltipTrigger>
                            <TooltipContent><p>Sobre o Grade</p></TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <div className="scale-90 xl:scale-110 origin-right"><ModeToggle /></div>
                </div>
            </div>
        </motion.header>
    );
}