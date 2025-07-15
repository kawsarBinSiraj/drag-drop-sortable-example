import React, { useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";

/**
 * ListItem Component
 *
 * Renders a heading item with a background color and border
 * based on its label. The label can range from H1 to H6.
 * The component is styled differently for H1 (non-draggable).
 *
 * @param {Object} item - The item data containing id, label, and title.
 * @returns {JSX.Element} The rendered list item.
 */
const ListItem = ({ item = { id: "", label: "", title: "" } }) => {
    /**
     * Determines the background and text color based on the label.
     *
     * @param {string} l - The label of the item (e.g., H1, H2).
     * @returns {string} The CSS class string for background and text color.
     */
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

/**
 * DraggableItem Component
 *
 * A container component to wrap a {@link ListItem} component
 * with drag-and-drop functionality.
 *
 * @param {Object} props - The component props.
 * @param {string} props.id - Unique identifier for the item.
 * @param {JSX.Element} props.children - The `ListItem` component to render.
 * @returns {JSX.Element} The rendered DraggableItem component.
 */
const DraggableItem = ({ id, children }) => {
    /**
     * Retrieves the Draggable properties and event listeners
     *
     * @see https://docs.dndkit.com/api/use-draggable
     */
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

    return (
        <div
            ref={setNodeRef}
            // Pass the Draggable event listeners to the container
            {...listeners}
            // Pass the Draggable attributes to the container
            {...attributes}
            // Add the Draggable transformation to the container
            style={{
                transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
            }}
            // Add some padding and border to the container
            className="p-0 w-full bg-white border border-gray-100 cursor-grab text-left rounded-lg"
        >
            {children}
        </div>
    );
};

/**
 * DroppableSlot Component
 *
 * A component to render a droppable slot placeholder.
 * It will be rendered when the user drags an item over the
 * droppable area.
 *
 * @param {Object} props - The component props.
 * @param {string} props.id - Unique identifier for the slot.
 * @returns {JSX.Element} The rendered DroppableSlot component.
 */
const DroppableSlot = ({ id }) => {
    /**
     * Retrieves the Droppable properties and event listeners
     *
     * @see https://docs.dndkit.com/api/use-droppable
     */
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
 * Nests the heading items in correct hierarchical structure based on label levels.
 * @param {Object.<string, Array>} headingItems
 * @returns {Array} Nested array starting from H1 items
 */
const nestHeadingItems = (headingItems) => {
    const allItems = [];

    // Flatten and maintain order (H1..H6 mix)
    ["h1", "h2", "h3", "h4", "h5", "h6"].forEach((level) => {
        (headingItems[level] || []).forEach((item) => {
            allItems.push({ ...item, children: [] });
        });
    });

    // Sort by appearance if needed, or keep as is (assuming original order is correct)
    const root = [];
    const stack = [];

    allItems.forEach((item) => {
        const level = parseInt(item.label[1]); // e.g., "H2" → 2

        // Pop higher/equal levels
        while (stack.length && parseInt(stack[stack.length - 1].label[1]) >= level) {
            stack.pop();
        }

        if (stack.length === 0) {
            root.push(item); // H1 level or no parent
        } else {
            stack[stack.length - 1].children.push(item); // Add to parent
        }

        stack.push(item); // Push current as new parent
    });

    return root;
};
/**
 * Flattens a nested heading structure into a grouped object by heading level.
 *
 * @param {Array} nestedHeadings - Nested headings (starting at H1).
 * @returns {Object<string, Array>} Flat headings grouped by level (h1–h6).
 */
const flattenHeadingItems = (nestedHeadings) => {
    const flatMap = {
        h1: [],
        h2: [],
        h3: [],
        h4: [],
        h5: [],
        h6: [],
    };

    const traverse = (nodes) =>
        nodes.forEach(({ children = [], ...rest }) => {
            const level = rest.label.toLowerCase(); // e.g., "H2" → "h2"
            flatMap[level].push({ ...rest, label: rest.label });
            if (children.length) traverse(children);
        });

    traverse(nestedHeadings);
    return flatMap;
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
                <pre className="text-[11px]">{JSON.stringify(nestHeadingItems(headingItems), null, 2)}</pre>
            </div>
        </div>
    );
}
