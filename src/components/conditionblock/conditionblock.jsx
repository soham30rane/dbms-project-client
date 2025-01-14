import React, { useState } from 'react';

export default function ConditionBlock({ 
    leftColor, rightColor,
    leftvalue, rightvalue, middlevalue,
    setLeftvalue, setRightvalue, setMiddleValue,
}) {
    const [showLeftMenu, setShowLeftMenu] = useState(false);
    const [showMiddleMenu, setShowMiddleMenu] = useState(false);
    // const [showRightMenu, setShowRightMenu] = useState(false);
    const [showColumnPicker, setShowColumnPicker] = useState(false);

    // Sample data - will be replaced by props
    const sampleTables = {
        'Users': ['id (int)', 'name (varchar)', 'email (varchar)','email (varchar)','email (varchar)'],
        'Orders': ['id (int)', 'user_id (int)', 'total (decimal)'],
        'products': ['id (int)', 'user_id (int)', 'total (decimal)']
    };

    const operators = ['=', '>', '<', '>=', '<=', '<>', 'LIKE', 'IN', 'BETWEEN'];

    return (
        <div className="flex items-center space-x-2 h-10 relative">
            {/* Left Field - Similar to JoinBlock */}
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
                                                <button 
                                                    onClick={() => {
                                                        setLeftvalue(`${table}.${column}`);
                                                        setShowLeftMenu(false);
                                                    }}
                                                >
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
            
            {/* Middle Field - Operators */}
            <div className="relative w-32">
                <div 
                    onClick={() => setShowMiddleMenu(!showMiddleMenu)}
                    className="bg-gray-200 rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-300 transition-colors"
                >
                    <div className="text-gray-700 text-sm text-center truncate">
                        {middlevalue || 'Operator'}
                    </div>
                </div>
                
                {showMiddleMenu && (
                    <div className="absolute top-full left-0 mt-1 z-50">
                        <ul className="menu bg-base-200 rounded-box shadow-lg h-48 overflow-y-auto">
                            {operators.map(op => (
                                <li key={op}>
                                    <button 
                                        onClick={() => {
                                            setMiddleValue(op);
                                            setShowMiddleMenu(false);
                                            setRightvalue('');  // Clear right value when operator changes
                                        }}
                                    >
                                        {op}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            
            {/* Right Field - Custom input or BETWEEN case */}
            {middlevalue === 'BETWEEN' ? (
                <div className="flex-1 min-w-[200px] flex space-x-2">
                    <input 
                        type="text"
                        className={`flex-1 ${rightColor} rounded-lg px-3 py-2`}
                        placeholder="Start value"
                        value={rightvalue?.split(' AND ')[0] || ''}
                        onChange={(e) => {
                            const endValue = rightvalue?.split(' AND ')[1] || '';
                            setRightvalue(`${e.target.value} AND ${endValue}`);
                        }}
                    />
                    <span className="flex items-center text-gray-500">AND</span>
                    <input 
                        type="text"
                        className={`flex-1 ${rightColor} rounded-lg px-3 py-2`}
                        placeholder="End value"
                        value={rightvalue?.split(' AND ')[1] || ''}
                        onChange={(e) => {
                            const startValue = rightvalue?.split(' AND ')[0] || '';
                            setRightvalue(`${startValue} AND ${e.target.value}`);
                        }}
                    />
                </div>
            ) : (
                <div className="relative flex-1 min-w-[100px]">
                    <div className="flex">
                        <input 
                            type="text"
                            className={`flex-1 ${rightColor} rounded-lg px-3 py-2`}
                            placeholder="Enter value"
                            value={rightvalue}
                            onChange={(e) => setRightvalue(e.target.value)}
                        />
                        <button 
                            onClick={() => setShowColumnPicker(!showColumnPicker)}
                            className="ml-2 px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                        >
                            ⌄
                        </button>
                    </div>
                    
                    {showColumnPicker && (
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
                                                    <button 
                                                        onClick={() => {
                                                            setRightvalue(`${table}.${column}`);
                                                            setShowColumnPicker(false);
                                                        }}
                                                    >
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
            )}
        </div>
    );
}