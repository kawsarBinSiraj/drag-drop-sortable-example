import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import RecursiveTree from "@/components/recursive-tree/RecursiveTree";
import NestedSortable from "@/components/sortable-example/NestedSortable";
import HeadingTree from "@/components/label-switch/HeadingTree";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function App() {
    return (
        <>
            <div className="App text-center">
                <img src={reactLogo} className="logo react inline-block" alt="React logo" />
            </div>
            <div className="w-[1200px] mx-auto text-start">
                <p className="mb-0 text-sm text-gray-600">
                    github :{" "}
                    <a href="https://github.com/kawsarBinSiraj/drag-drop-sortable-example" className="text-blue-500" target="_blank" rel="noopener noreferrer">
                       https://github.com/kawsarBinSiraj/drag-drop-sortable-example
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
                        <NestedSortable />
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
