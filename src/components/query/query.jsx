import React, { useState } from 'react';
import JoinBlock from '../joinblock/joinblock';

const colorPairs = [
  { left: 'bg-blue-200', right: 'bg-purple-200' },
  { left: 'bg-green-200', right: 'bg-yellow-200' },
  { left: 'bg-pink-200', right: 'bg-orange-200' },
];

const conditionColors = [
  { left: 'bg-teal-200', right: 'bg-indigo-200' },
  { left: 'bg-rose-200', right: 'bg-cyan-200' },
];

export default function Query({ query }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [logicOp, setLogicOp] = useState(['','AND', 'OR','OR','OR','OR']);

    const toggleLogic = (index) => {
        setLogicOp(prev => {
            const newLogic = [...prev];
            newLogic[index] = prev[index] === 'AND' ? 'OR' : 'AND';
            return newLogic;
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Header Section */}
            <div className="p-4 border-b border-gray-100">
                <div className="flex justify-between items-center">
                    <p className="text-gray-600 truncate">{query.description || 'New Query'}</p>
                    <div className="space-x-2">
                        <button 
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="btn btn-sm btn-ghost">
                            {isExpanded ? 'Close' : 'Edit'}
                        </button>
                        <button className="btn btn-sm btn-primary">Run</button>
                    </div>
                </div>
            </div>

            {/* Expandable Edit Section */}
            {isExpanded && (
                <div className="p-4 bg-gray-50 transition-all duration-300">
                    {/* Joins Section */}
                    <div className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">JOINS</h3>
                        <div className="space-y-2">
                            {[0, 1,2,3,4,5].map((index) => (
                                <JoinBlock 
                                    key={index}
                                    leftColor={colorPairs[index % colorPairs.length].left}
                                    rightColor={colorPairs[index % colorPairs.length].right}
                                />
                            ))}
                            <button className="btn btn-sm btn-outline w-full mt-2">
                                + Add Join
                            </button>
                        </div>
                    </div>

                    {/* Conditions Section */}
                    <div className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">CONDITIONS</h3>
                        <div className="space-y-2">
                            {[0,1,2,3,4,5].map((index) => (<>
                                {/* Logic Toggle Button */}
                                {index>0?<div className="flex justify-center">
                                    <button 
                                        onClick={() => toggleLogic(index)}
                                        className="px-4 py-1 text-xs font-medium rounded-full 
                                                bg-blue-100 hover:bg-blue-200 transition-colors
                                                text-blue-700 transform hover:scale-105 
                                                border border-blue-200">
                                        {logicOp[index]}
                                    </button>
                                </div>:<></>}
                                <JoinBlock 
                                    key={index}
                                    leftColor={conditionColors[index % conditionColors.length].left}
                                    rightColor={conditionColors[index % conditionColors.length].right}
                                    isCondition
                                />
                                </>
                            ))}
                            <button className="btn btn-sm btn-outline w-full mt-2">
                                + Add Condition
                            </button>
                        </div>
                    </div>

                    {/* Description Section */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">DESCRIPTION</h3>
                        <textarea 
                            className="w-full p-2 border rounded-lg resize-none h-24"
                            placeholder="Enter query description..."
                        />
                    </div>
                </div>
            )}
        </div>
    );
}