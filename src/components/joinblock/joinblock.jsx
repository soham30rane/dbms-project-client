import React, { useState } from 'react';

export default function JoinBlock({ 
    leftColor, rightColor,
    leftvalue, rightvalue, middlevalue,
    setLeftvalue, setRightvalue, setMiddleValue,
}) {
    const [showLeftMenu, setShowLeftMenu] = useState(false);
    const [showMiddleMenu, setShowMiddleMenu] = useState(false);
    const [showRightMenu, setShowRightMenu] = useState(false);

    // Sample data - will be replaced by props
    const sampleTables = {
        'Users': ['id (int)', 'name (varchar)', 'email (varchar)'],
        'Orders': ['id (int)', 'user_id (int)', 'total (decimal)']
    };

    const joinTypes = ['LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN'];

    return (
        <div className="flex items-center space-x-2 h-10 relative">
            {/* Left Field */}
            <div className="relative flex-1 min-w-[100px]">
                <div 
                    onClick={() => setShowLeftMenu(!showLeftMenu)}
                    className={`${leftColor} rounded-lg px-3 py-2 cursor-pointer 
                               hover:opacity-80 transition-opacity`}
                >
                    <div className="text-gray-700 text-sm truncate">
                        {leftvalue || "Select field"}
                    </div>
                </div>
                
                {showLeftMenu && (
                    <div className="absolute top-full left-0 mt-1 z-50 w-96">
                        <ul className="menu bg-base-200 rounded-box shadow-lg h-48 overflow-y-auto">
                            {Object.entries(sampleTables).map(([table, columns]) => (
                                <li key={table}>
                                    <div className="font-medium text-gray-600 bg-gray-100 cursor-default px-4 py-2 select-none pointer-events-none">
                                        {table}
                                    </div>
                                    <ul>
                                        {columns.map(column => (
                                            <li key={column}>
                                                <button href='.' onClick={() => {
                                                    setLeftvalue(`${table}.${column}`);
                                                    setShowLeftMenu(false);
                                                }}>
                                                    {column}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            
            {/* Middle Field */}
            <div className="relative w-32">
                <div 
                    onClick={() => setShowMiddleMenu(!showMiddleMenu)}
                    className={`bg-gray-200 rounded-lg px-3 py-2 
                              cursor-pointer hover:bg-gray-300 
                              transition-colors`}
                >
                    <div className="text-gray-700 text-sm text-center truncate">
                        {middlevalue || 'Join type'}
                    </div>
                </div>
                
                {showMiddleMenu && (
                    <div className="absolute top-full left-0 mt-1 z-50">
                        <ul className="menu bg-base-200 rounded-box shadow-lg h-48 overflow-y-auto">
                            {joinTypes.map(type => (
                                <li key={type}>
                                    <button href='.' onClick={() => {
                                        setMiddleValue(type);
                                        setShowMiddleMenu(false);
                                    }}>
                                        {type}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            
            {/* Right Field */}
            <div className="relative flex-1 min-w-[100px]">
                <div 
                    onClick={() => setShowRightMenu(!showRightMenu)}
                    className={`${rightColor} rounded-lg px-3 py-2 
                                cursor-pointer hover:opacity-80 
                                transition-opacity`}
                >
                    <div className="text-gray-700 text-sm truncate">
                        {rightvalue || "Select field"}
                    </div>
                </div>
                
                {showRightMenu && (
                    <div className="absolute top-full left-0 mt-1 z-50 w-96">
                        <ul className="menu bg-base-200 rounded-box shadow-lg h-48 overflow-y-auto">
                            {Object.entries(sampleTables).map(([table, columns]) => (
                                <li key={table}>
                                    <div className="font-medium text-gray-600 bg-gray-100 cursor-default px-4 py-2 select-none pointer-events-none">
                                        {table}
                                    </div>
                                    <ul>
                                        {columns.map(column => (
                                            <li key={column}>
                                                <button href='.' onClick={() => {
                                                    setRightvalue(`${table}.${column}`);
                                                    setShowRightMenu(false);
                                                }}>
                                                    {column}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}