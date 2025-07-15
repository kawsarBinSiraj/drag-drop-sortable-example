import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";

/**
 * Updates an item in the list by its ID.
 * This function is used to update a single item in the list, without re-rendering the entire list.
 * @param {Object[]} items - The list of items to search through.
 * @param {string|number} idToUpdate - The ID of the item to update.
 * @param {function} updateFunction - The function to call to update the item.
 * @returns {Object[]} The updated list of items.
 */
const updateItemById = (items, idToUpdate, updateFunction) => {
    return items.map((item) => {
        // If the item's ID matches the one to update, call the update function.
        if (item.id === idToUpdate) {
            return updateFunction(item);
        }

        // If the item has children, recursively search through them.
        if (item.children) {
            return {
                ...item,
                // Recursively call the update function on the children.
                children: updateItemById(item.children, idToUpdate, updateFunction),
            };
        }

        // If the item doesn't match the ID or have children, return the item unchanged.
        return item;
    });
};

/**
 * NestedItem Component
 *
 * Renders a sortable list item with nested children.
 * Each item can have a type (h1-h6) which dictates its style.
 * The list is sortable using the ReactSortable component, allowing
 * for child items to be re-ordered.
 *
 * @param {Object} item - The item data, including id, name, type, and children.
 * @param {Function} updateParentList - Function to update the parent list state.
 * @param {number} label - The current nesting level of the item.
 * @returns {React.ReactElement} The rendered nested sortable list item.
 */
const NestedItem = ({ item, updateParentList, label }) => {
    // Function to update the list of children for the current item
    const updateChildrenList = (newChildren) => {
        updateParentList((prevItems) => updateItemById(prevItems, item.id, (prevItem) => ({ ...prevItem, children: newChildren })));
    };

    // Define styles based on the item's type
    const headingStyles = {
        h1: "bg-purple-100 text-purple-700 border border-purple-400",
        h2: "bg-yellow-100 text-yellow-700 border border-yellow-400",
        h3: "bg-blue-100 text-blue-700 border border-blue-400",
        h4: "bg-green-100 text-green-700 border border-green-400",
        h5: "bg-indigo-100 text-indigo-700 border border-indigo-400",
        h6: "bg-gray-200 text-gray-700 border border-gray-400",
    };

    // Get styles for the item based on its type
    const getItemStyles = (type) => {
        return `py-1 px-2 rounded-md font-semibold text-xs ${headingStyles[type]}`;
    };

    return (
        <li
            key={item.id}
            className={`mb-2 list-none`} // Margin for spacing between items
        >
            <div className="sortable-list-div cursor-grab flex items-center justify-between bg-white border border-gray-100 rounded-lg shadow-xs p-4">
                {/* Left side: Heading tag and title */}
                <div className="flex items-center space-x-3">
                    <span className={getItemStyles(item.type)}>{item.type.toUpperCase()}</span>
                    <span className="font-semibold text-gray-800">{item.name}</span>
                </div>

                {/* Icons can be added here */}
                {/* <div className="flex items-center space-x-3 text-gray-400 cursor-pointer">...</div> */}
            </div>

            {/* Recursively render children if they exist */}
            {item.children && item.children.length > 0 && (
                <ReactSortable
                    list={item.children}
                    setList={updateChildrenList}
                    group={{ name: `nested-group-${item.id}`, pull: true, put: false }}
                    animation={400}
                    tag="ul"
                    className={`nested-sortable mt-2 p-0`}
                    style={{ marginLeft: `${40}px` }} // Indentation for nested items
                >
                    {item.children.map((child) => (
                        <NestedItem key={child.id} item={child} updateParentList={updateParentList} label={label + 1} />
                    ))}
                </ReactSortable>
            )}
        </li>
    );
};

/**
 * A component that renders a nested sortable list.
 * Each item in the list can have children, and the children can be nested
 * to any depth.
 *
 * The component uses the `ReactSortable` component from the `react-sortablejs` library
 * to make the list sortable.
 *
 * The component also uses the `useState` hook to keep track of the state of the list.
 *
 * @returns {React.ReactElement} A React component that renders a nested sortable list.
 */
const SortableTree = () => {
    const [list, setList] = useState([
        {
            id: 1,
            name: "Content Marketing ROI: The Ultimate Guide",
            type: "h1",
            children: [],
        },
        {
            id: 3,
            name: "Measuring the Impact of Your Content",
            type: "h1",
            children: [],
        },
        {
            id: 2,
            name: "How to Create a Content Marketing Strategy",
            type: "h1",
            children: [
                { id: "2-1", name: "Step 1: Set Your Goals", type: "h2", children: [] },
                { id: "2-2", name: "Step 2: Define Your Audience", type: "h2", children: [] },
                {
                    id: "2-4",
                    name: "Step 4: Create a Content Calendar",
                    type: "h2",
                    children: [
                        { id: "2-4-1", name: "Brainstorm Topics", type: "h3", children: [] },
                        { id: "2-4-2", name: "Assign Deadlines", type: "h3", children: [] },
                        {
                            id: "2-4-3",
                            name: "Review and Publish",
                            type: "h3",
                            children: [
                                { id: "2-4-3-1", name: "Final Edits", type: "h4", children: [] },
                                { id: "2-4-3-2", name: "Publishing Checklist", type: "h4", children: [] },
                            ],
                        },
                    ],
                },
            ],
        },

        {
            id: 4,
            name: "Advanced SEO Techniques",
            type: "h1",
            children: [
                {
                    id: "4-1",
                    name: "Technical SEO",
                    type: "h2",
                    children: [
                        { id: "4-1-1", name: "Schema Markup", type: "h3", children: [] },
                        {
                            id: "4-1-2",
                            name: "Core Web Vitals",
                            type: "h3",
                            children: [
                                { id: "4-1-2-1", name: "LCP Optimization", type: "h4", children: [] },
                                { id: "4-1-2-2", name: "CLS Best Practices", type: "h4", children: [] },
                                {
                                    id: "4-1-2-3",
                                    name: "FID Testing",
                                    type: "h4",
                                    children: [
                                        {
                                            id: "4-1-2-3-1",
                                            name: "Testing with Lighthouse",
                                            type: "h5",
                                            children: [
                                                { id: "4-1-2-3-1-1", name: "Test Step 1", type: "h6", children: [] },
                                                { id: "4-1-2-3-1-2", name: "Test Step 2", type: "h6", children: [] },
                                                { id: "4-1-2-3-1-3", name: "Test Step 3", type: "h6", children: [] },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ]);

    /**
     * A function that updates the state of the list when the user drags and drops an item.
     * The function takes a new list as an argument and updates the state of the component
     * with the new list.
     *
     * @param {Object[]} newList The new list of items.
     */
    const updateList = (newList) => {
        setList(newList);
    };

    return (
        <div id="sortable-example" className="flex gap-12">
            <div className="font-sans w-[60%]">
                <div className="header mb-5">
                    <pre className="text-xs text-start -mt-7">
                        {`
/**
 * A component that renders a nested sortable list.
 * Each item in the list can have children, and the children can be nested
 * to any depth.
 *
 * The component uses the \`ReactSortable\` component from the \`react-sortablejs\` library
 * to make the list sortable.
 *
 * The component also uses the \`useState\` hook to keep track of the state of the list.
 * @returns {React.ReactElement} A React component that renders a nested sortable list.
 */
`}
                    </pre>
                </div>
                <div id="sortable">
                    <ReactSortable list={list} setList={updateList} group={{ name: "main-group", pull: true, put: false }} animation={400} tag="ul">
                        {list.map((item) => (
                            <NestedItem key={item.id} item={item} updateParentList={updateList} label={1} />
                        ))}
                    </ReactSortable>
                </div>
            </div>
            <div className="w-[40%] text-start">
                <pre className="text-[11px]">{JSON.stringify(list, null, 2)}</pre>
            </div>
        </div>
    );
};

export default SortableTree;
