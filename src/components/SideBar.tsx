import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronsLeft, Menu, FileText } from 'lucide-react';
import { ElementRef } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Actions } from '../functions/sideBarFunction';

interface Note {
    ID: number;
    title: string;
}

const SideBar: React.FC = () => {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const isResizing = useRef(false);
    const sideBarRef = useRef<ElementRef<"aside">>(null);
    const navbarRef = useRef<ElementRef<"div">>(null);
    const [isResetting, setIsResetting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(isMobile);
    const [notes, setNotes] = useState<Note[]>([]);
    const ws = useRef<WebSocket | null>(null);

 useEffect(() => {
        if (isMobile) {
            collapse();
        } else {
            resetWidth();
        }
        fetchNotes();
        connectWebSocket();
        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, [isMobile]);

    const fetchNotes = async () => {
        try {
            const response = await axios.get<Note[]>('http://localhost:3000/notes', { withCredentials: true });
            setNotes(response.data);
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };
const connectWebSocket = () => {
    if (ws.current?.readyState === WebSocket.OPEN) {
        return; // WebSocket is already open
    }

    ws.current = new WebSocket('ws://localhost:3000/ws');

    ws.current.onopen = () => {
        console.log('WebSocket connected');
    };

    ws.current.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);
            if (data.type === 'noteList') {
                setNotes(data.data);
            } else if (data.type === 'noteUpdate') {
                const updatedNote = data.data;
                setNotes(prevNotes => prevNotes.map(note => note.ID === updatedNote.ID ? updatedNote : note));
            } else if (data.type === 'noteDelete') {
                const deletedNoteID = data.data;
                setNotes(prevNotes => prevNotes.filter(note => note.ID !== deletedNoteID));
            }
        } catch (error) {
            console.error('Error parsing WebSocket message:', error);
        }
    };

    ws.current.onclose = (event) => {
        console.log('WebSocket disconnected:', event.reason);
        setTimeout(connectWebSocket, 3000); // Attempt to reconnect after 3 seconds
    };

    ws.current.onerror = (error) => {
        console.error('WebSocket error:', error);
    };
};
 //
    const handleMouseDown = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.preventDefault();
        event.stopPropagation();

        isResizing.current = true;
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };
// handle Mouse Move 
    const handleMouseMove = (event: MouseEvent) => {
        if (!isResizing.current) return;
        let newWidth = event.clientX;

        if (newWidth < 240) newWidth = 240;
        if (newWidth > 480) newWidth = 480;

        if (sideBarRef.current && navbarRef.current) {
            sideBarRef.current.style.width = `${newWidth}px`;
            navbarRef.current.style.setProperty("left", `${newWidth}px`);
            navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`);
        }
    };
// handle mouse up
    const handleMouseUp = () => {
        isResizing.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };
//reset width function
    const resetWidth = () => {
        if (sideBarRef.current && navbarRef.current) {
            setIsCollapsed(false);
            setIsResetting(true);

            sideBarRef.current.style.width = isMobile ? "100%" : "240px";
            navbarRef.current.style.setProperty(
                "width",
                isMobile ? "0" : "calc(100% - 240px)"
            );
            navbarRef.current.style.setProperty(
                "left",
                isMobile ? "100%" : "240px"
            );
            setTimeout(() => setIsResetting(false), 300);
        }
    };
//collapse function
    const collapse = () => {
        if (sideBarRef.current && navbarRef.current) {
            setIsCollapsed(true);
            setIsResetting(true);

            sideBarRef.current.style.width = "0";
            navbarRef.current.style.setProperty("width", "100%");
            navbarRef.current.style.setProperty("left", "0");
            setTimeout(() => setIsResetting(false), 300);
        }
    };

 return (
        <>
            <motion.aside
                ref={sideBarRef}
                initial={{ width: isMobile ? 0 : 240 }}
                animate={{ width: isCollapsed ? 0 : isMobile ? "100%" : 240 }}
                transition={{ duration: 0.3 }}
                className={cn(
                    "group/sidebar h-full bg-white overflow-y-auto relative flex flex-col z-[99999]",
                    isResetting && "transition-all ease-in-out duration-300"
                )}
            >
                <div
                    role="button"
                    onClick={collapse}
                    className={cn(
                        "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
                        isMobile && "opacity-100"
                    )}
                >
                    <ChevronsLeft className="h-6 w-6" />
                </div>
                <Actions/>
                <div className="mt-4">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        <Link to="#" className="flex gap-2 text-muted-foreground hover:text-primary px-4 py-2">
                            <FileText />
                            Documents
                        </Link>
                    </motion.div>
                    <div className="mt-2 pl-6">
                        {notes.map((note) => (
                            <motion.div
                                key={note.ID}
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <Link to={`/note/${note.ID}`} className="block text-sm text-muted-foreground hover:text-primary py-1">
                                    {note.title}
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
                <div
                    onMouseDown={handleMouseDown}
                    onClick={resetWidth}
                    className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-blue-400 right-0 top-0"
                />
            </motion.aside>
            <motion.div
                ref={navbarRef}
                initial={{ left: isMobile ? 0 : 240, width: isMobile ? "100%" : "calc(100% - 240px)" }}
                animate={{ left: isCollapsed ? 0 : isMobile ? "100%" : 240, width: isCollapsed ? "100%" : isMobile ? "0" : "calc(100% - 240px)" }}
                transition={{ duration: 0.3 }}
                className={cn(
                    "absolute top-0 z-[99999]",
                    isResetting && "transition-all ease-in-out duration-300"
                )}
            >
                <AnimatePresence>
                    {isCollapsed && (
                        <motion.nav
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="bg-transparent px-3 py-2 w-full"
                        >
                            <Menu
                                onClick={resetWidth}
                                role="button"
                                className="h-6 w-6 text-muted-foreground"
                            />
                        </motion.nav>
                    )}
                </AnimatePresence>
            </motion.div>
        </>
    );
};

export default SideBar;
