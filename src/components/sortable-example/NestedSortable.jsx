import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";

// Helper function to find and update an item within a nested array.
const updateItemById = (items, idToUpdate, updateFunction) => {
    return items.map((item) => {
        if (item.id === idToUpdate) {
            return updateFunction(item);
        }
        if (item.children) {
            return {
                ...item,
                children: updateItemById(item.children, idToUpdate, updateFunction),
            };
        }
        return item;
    });
};

// A recursive component to render each item and its children.
const NestedItem = ({ item, updateParentList, label }) => {
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

    const getItemStyles = (type) => {
        return `py-1 px-2 rounded-md font-semibold text-xs ${headingStyles[type]}`;
    };

    return (
        <li
            key={item.id}
            // Dynamic margin for indentation
            className={`mb-2 list-none`}
        >
            <div className="sortable-list-div cursor-grab flex items-center justify-between bg-white border border-gray-100 rounded-lg shadow-xs p-4">
                {/* Left side: Heading tag and title */}
                <div className="flex items-center space-x-3">
                    <span className={getItemStyles(item.type)}>{item.type.toUpperCase()}</span>
                    <span className="font-semibold text-gray-800">{item.name}</span>
                </div>

                {/* Right side: Icons */}
                {/* <div className="flex items-center space-x-3 text-gray-400 cursor-pointer">
                    <span className="text-xl">
                        <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M6.97051 4.577L7.57276 6.2495C8.24176 8.10575 9.70351 9.5675 11.5598 10.2365L13.2323 10.8388C13.383 10.8935 13.383 11.1073 13.2323 11.1613L11.5598 11.7635C9.70351 12.4325 8.24176 13.8943 7.57276 15.7505L6.97051 17.423C6.91576 17.5738 6.70201 17.5738 6.64801 17.423L6.04576 15.7505C5.37676 13.8943 3.91501 12.4325 2.05876 11.7635L0.386256 11.1613C0.235506 11.1065 0.235506 10.8928 0.386256 10.8388L2.05876 10.2365C3.91501 9.5675 5.37676 8.10575 6.04576 6.2495L6.64801 4.577C6.70201 4.4255 6.91576 4.4255 6.97051 4.577Z"
                                fill="#E4E4E4"
                            />
                            <path
                                d="M14.4991 0.557938L14.8043 1.40469C15.1433 2.34444 15.8836 3.08469 16.8233 3.42369L17.6701 3.72894C17.7466 3.75669 17.7466 3.86469 17.6701 3.89244L16.8233 4.19769C15.8836 4.53669 15.1433 5.27694 14.8043 6.21669L14.4991 7.06344C14.4713 7.13994 14.3633 7.13994 14.3356 7.06344L14.0303 6.21669C13.6913 5.27694 12.9511 4.53669 12.0113 4.19769L11.1646 3.89244C11.0881 3.86469 11.0881 3.75669 11.1646 3.72894L12.0113 3.42369C12.9511 3.08469 13.6913 2.34444 14.0303 1.40469L14.3356 0.557938C14.3633 0.480688 14.4721 0.480688 14.4991 0.557938Z"
                                fill="#E4E4E4"
                            />
                            <path
                                d="M14.4991 14.9377L14.8043 15.7845C15.1433 16.7242 15.8836 17.4645 16.8233 17.8035L17.6701 18.1087C17.7466 18.1365 17.7466 18.2445 17.6701 18.2722L16.8233 18.5775C15.8836 18.9165 15.1433 19.6567 14.8043 20.5965L14.4991 21.4432C14.4713 21.5197 14.3633 21.5197 14.3356 21.4432L14.0303 20.5965C13.6913 19.6567 12.9511 18.9165 12.0113 18.5775L11.1646 18.2722C11.0881 18.2445 11.0881 18.1365 11.1646 18.1087L12.0113 17.8035C12.9511 17.4645 13.6913 16.7242 14.0303 15.7845L14.3356 14.9377C14.3633 14.8612 14.4721 14.8612 14.4991 14.9377Z"
                                fill="#E4E4E4"
                            />
                        </svg>
                    </span>
                    <span className="font-bold text-gray-300 text-lg">•••</span>
                </div> */}
            </div>

            {/* Recursively render children */}
            {item.children && item.children.length > 0 && (
                <ReactSortable
                    list={item.children}
                    setList={updateChildrenList}
                    group={{ name: `nested-group-${item.id}`, pull: true, put: false }}
                    animation={400}
                    tag="ul"
                    className={`nested-sortable mt-2 p-0`}
                    style={{ marginLeft: `${40}px` }}
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
const NestedSortable = () => {
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

export default NestedSortable;
