import React, { useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";

const ListItem = ({ item = { id: "", label: "", title: "" } }) => {
    const getBgColor = (l = "") => {
        switch (l) {
            case "H1":
                return "bg-rose-100 text-rose-700 border border-rose-400";
            case "H2":
                return "bg-amber-100 text-amber-700 border border-amber-400";
            case "H3":
                return "bg-sky-100 text-sky-700 border border-sky-400";
            case "H4":
                return "bg-emerald-100 text-emerald-700 border border-emerald-400";
            case "H5":
                return "bg-fuchsia-100 text-fuchsia-700 border border-fuchsia-400";
            case "H6":
                return "bg-lime-100 text-lime-700 border border-lime-400";
            default:
                return "bg-gray-200 text-gray-700 border border-gray-400";
        }
    };

    return (
        <div className={`text-sm flex items-center gap-2 bg-white border border-gray-100 rounded-lg shadow-xs p-3 ${item.label === "H1" ? "cursor-default" : "cursor-grab"}`}>
            <span className={`px-2 py-1 rounded border text-black ${getBgColor(item.label)}`}>{item.label}</span>
            <p className="m-0 leading-tight">{item.title}</p>
        </div>
    );
};

const DraggableItem = ({ id, children }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            className="p-0 w-full bg-white border border-gray-100 cursor-grab text-left rounded-lg"
            style={{
                transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
            }}
        >
            {children}
        </div>
    );
};

const DroppableSlot = ({ id }) => {
    const { setNodeRef, isOver } = useDroppable({ id });

    return <div ref={setNodeRef} className={`transition-all ${isOver ? "h-2 my-1 bg-orange-500 rounded-2xl" : "h-[5px]"}`} />;
};

const DroppableBox = ({ id, items, level }) => {
    return (
        <div className="flex flex-col justify-center rounded transition-all">
            <DroppableSlot id={`${level}-slot-0`} />
            {items?.map((item, index) => (
                <React.Fragment key={item.id}>
                    <DraggableItem id={item.id}>
                        <ListItem item={item} />
                    </DraggableItem>
                    <DroppableSlot id={`${level}-slot-${index + 1}`} />
                </React.Fragment>
            ))}
        </div>
    );
};

/**
 * HeadingTree Component
 *
 * Renders a drag-and-drop sortable list of headings (H1 to H6).
 * Users can reorder headings by level (except H1) using the Dnd Kit.
 * Each heading level is color-coded and visually indented.
 *
 * Components:
 * - ListItem: Displays a styled heading item.
 * - DraggableItem: Makes an item draggable.
 * - DroppableSlot: Slot indicator where item can be dropped.
 * - DroppableBox: Wraps each heading level list with drop zones.
 */
export default function HeadingTree() {
    /**
     * Levels of headings to display.
     * This array is used to generate the structure of the list.
     */
    const levels = ["h2", "h3", "h4", "h5", "h6"];

    /**
     * State of the list of headings.
     * This object is used to store the state of the list.
     */
    const [headingItems, setHeadingItems] = useState({
        h1: [
            {
                id: "h1-1",
                label: "H1",
                title: "Content Marketing ROI: Measuring What Actually Matters",
            },
        ],
        h2: [
            { id: "h2-1", label: "H2", title: "Understanding Conversion-Focused Content" },
            {
                id: "h2-2",
                label: "H2",
                title: "7 Proven Content Strategies for the Best Conversion",
            },
        ],
        h3: [
            { id: "h3-1", label: "H3", title: "Strategy #4: Utilize Social Proof" },
            {
                id: "h3-2",
                label: "H3",
                title: "Strategy #5: Create Clear and Compelling CTAs",
            },
        ],
        h4: [
            {
                id: "h4-1",
                label: "H4",
                title: "Example: Customer Testimonials on Product Pages",
            },
        ],
        h5: [
            {
                id: "h5-1",
                label: "H5",
                title: "Tip: Include a photo and name with each testimonial",
            },
            {
                id: "h5-2",
                label: "H5",
                title: "Definition: Action-Oriented Language",
            },
        ],
        h6: [
            {
                id: "h6-2",
                label: "H6",
                title: "Disclaimer: Results may vary by industry",
            },
        ],
    });

    /**
     * Handles the drag end event.
     * This function is called when the user releases the mouse button after dragging an item.
     *
     * @param {object} event The event object.
     */
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const draggedId = active.id;
        let draggedItem = null;
        let fromLevel = null;

        for (const level of levels) {
            const found = headingItems[level].find((item) => item.id === draggedId);
            if (found) {
                draggedItem = found;
                fromLevel = level;
                break;
            }
        }

        if (!draggedItem) return;

        const overParts = over.id.split("-slot-");
        const level = overParts[0];
        const insertIndex = parseInt(overParts[1], 10);

        if (!levels.includes(level)) return;

        const updatedItems = { ...headingItems };
        updatedItems[fromLevel] = updatedItems[fromLevel].filter((item) => item.id !== draggedId);
        updatedItems[level] = [...updatedItems[level].slice(0, insertIndex), { ...draggedItem, label: level.toUpperCase() }, ...updatedItems[level].slice(insertIndex)];

        setHeadingItems(updatedItems);
    };

    return (
        <div id="DndContext" className="flex gap-12">
            <div className="w-[60%]">
                <div className="header mb-5">
                    <pre className="text-xs text-start -mt-7">
                        {`
/**
 * HeadingTree Component
 *
 * Renders a drag-and-drop sortable list of headings (H1 to H6).
 * Users can reorder headings by level (except H1) using the Dnd Kit.
 * Each heading level is color-coded and visually indented.
 *
 * Components:
 * - ListItem: Displays a styled heading item.
 * - DraggableItem: Makes an item draggable.
 * - DroppableSlot: Slot indicator where item can be dropped.
 * - DroppableBox: Wraps each heading level list with drop zones.
 */
`}
                    </pre>
                </div>

                <DndContext
                    onDragEnd={handleDragEnd}
                    onDragOver={(event) => {
                        // optional hover feedback
                    }}
                >
                    <div className="space-y-2">
                        <div className="h1-items">
                            {headingItems.h1.map((item) => (
                                <ListItem key={item.id} item={item} />
                            ))}
                        </div>
                        {levels.map((level, i) => (
                            <div key={level} className={`${level}-items`} style={{ paddingLeft: `${(i + 1) * 40}px`, marginTop: i === 0 ? -7 : -15 }}>
                                <DroppableBox id={level} level={level} items={headingItems[level] || []} />
                            </div>
                        ))}
                    </div>
                </DndContext>
            </div>
            <div className="w-[40%]">
                <pre className="text-[11px]">{JSON.stringify(headingItems, null, 2)}</pre>
            </div>
        </div>
    );
}
