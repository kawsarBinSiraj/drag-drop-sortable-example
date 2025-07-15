import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import RecursiveTree from "@/components/recursive-tree/RecursiveTree";
import SortableTree from "@/components/sortable-example/SortableTree";
import HeadingTree from "@/components/label-switch/HeadingTree";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function App() {
    return (
        <>
            <div className="App text-center">
                <img src={reactLogo} className="logo react inline-block" alt="React logo" />
            </div>
            <div className="w-[1200px] mx-auto text-start">
                <p className="mb-0 text-sm text-gray-600 flex align-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.11.82-.26.82-.577v-2.165c-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.087-.744.083-.729.083-.729 1.205.084 1.838 1.237 1.838 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.304.762-1.604-2.665-.304-5.467-1.332-5.467-5.93 0-1.31.47-2.381 1.235-3.221-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23A11.52 11.52 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.29-1.553 3.297-1.23 3.297-1.23.655 1.653.243 2.873.12 3.176.765.84 1.234 1.911 1.234 3.221 0 4.61-2.807 5.625-5.479 5.921.43.372.814 1.103.814 2.222v3.293c0 .319.22.694.825.576C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"
                            fill="#000"
                        />
                    </svg>{" "}
                    :{" "}
                    <a href="https://github.com/kawsarBinSiraj/drag-drop-sorter" className="text-blue-500" target="_blank" rel="noopener noreferrer">
                       https://github.com/kawsarBinSiraj/drag-drop-sorter
                    </a>
                </p>
                <p className="mb-3 text-xs text-gray-600">
                    @developed_by :{" "}
                    <a href="https://kawsarbinsiraj.github.io/" className="text-blue-500" target="_blank" rel="noopener noreferrer">
                        Kawsar Bin Siraj
                    </a>
                </p>
                <Tabs defaultValue="sort" className={"w-full"}>
                    <TabsList className={"mb-5 h-auto px-3 py-3 block text-start"}>
                        <TabsTrigger value="sort" className={"px-3 py-2 cursor-pointer me-2"}>
                            Item Sort with DRAG-DROP
                        </TabsTrigger>
                        <TabsTrigger value="label-switch" className={"px-3 py-2 cursor-pointer me-2"}>
                            Label Switch with UP/DOWN DRAG-DROP
                        </TabsTrigger>
                        <TabsTrigger value="recursive" className={"px-3 py-2 cursor-pointer"}>
                            Recursive Tree
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="sort">
                        <SortableTree />
                    </TabsContent>
                    <TabsContent value="label-switch">
                        <HeadingTree />
                    </TabsContent>
                    <TabsContent value="recursive">
                        <RecursiveTree />
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
}

export default App;
