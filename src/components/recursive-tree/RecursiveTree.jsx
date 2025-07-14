import React, { useState } from "react";

/**
 * Recursive Item Component
 *
 * @param {object} item - The node item
 * @param {number} level - Current depth level
 * @param {function} onAddChild - Handler to add child
 */
const Item = ({ item, level = 0, onAddChild }) => {
    return (
        <div className={`pl-4 my-2 border-l-2 transition-all`} style={{ marginLeft: level * 16 }}>
            <div className="flex items-center justify-between bg-white rounded-lg shadow-sm p-3 border border-gray-200 hover:shadow-md transition">
                <div className="font-medium text-gray-800">{item.title}</div>
                <button onClick={() => onAddChild(item.id)} className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition">
                    + Add Child
                </button>
            </div>

            {item.children?.map((child) => (
                <Item key={child.id} item={child} level={level + 1} onAddChild={onAddChild} />
            ))}
        </div>
    );
};

/**
 * RecursiveTree
 *
 * Displays a recursive nested tree with the ability to add children dynamically.
 */
const RecursiveTree = () => {
    const [treeData, setTreeData] = useState([
        {
            id: "1",
            title: "Item 1",
            children: [{ id: "1-1", title: "Item 1.1", children: [] }],
        },
        {
            id: "2",
            title: "Item 2",
            children: [],
        },
    ]);

    // Add a child to the selected item by ID
    const addChild = (nodes, targetId) =>
        nodes.map((node) => {
            if (node.id === targetId) {
                const newChild = {
                    id: `${node.id}-${(node.children?.length || 0) + 1}`,
                    title: `Child of ${node.title}`,
                    children: [],
                };
                return {
                    ...node,
                    children: [...(node.children || []), newChild],
                };
            } else if (node.children) {
                return {
                    ...node,
                    children: addChild(node.children, targetId),
                };
            }
            return node;
        });

    const handleAddChild = (id) => {
        setTreeData((prev) => addChild(prev, id));
    };

    return (
        <div className="flex gap-12">
            <div className="w-[60%]">
                <div className="header mb-5">
                    <pre className="text-xs text-start -mt-7">
                        {`
/**
 * Item Component (Recursive)
 *
 * Displays a single tree node with padding and left border based on depth.
 * Includes a button to add child nodes recursively.
 *
 * @param {object} props
 * @param {object} props.item - Node data { id, title, children }
 * @param {number} props.level - Current depth level in the tree (default: 0)
 * @param {Function} props.onAddChild - Callback to add a child node
 */
`}
                    </pre>
                </div>
                <div className=" p-6 bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">📂 Recursive Tree</h3>
                    <div>
                        {treeData.map((item) => (
                            <Item key={item.id} item={item} onAddChild={handleAddChild} />
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-[40%]">
                <pre className="text-[11px]">{JSON.stringify(treeData, null, 2)}</pre>
            </div>
        </div>
    );
};

export default RecursiveTree;
