import React from 'react';

export default function JoinBlock({ leftColor, rightColor, isCondition = false }) {
    return (
        <div className="flex items-center space-x-2 h-10">
            <div className={`flex-1 min-w-[120px] ${leftColor} rounded-lg px-3 py-2 cursor-pointer hover:opacity-80 transition-opacity`}>
                <div className="text-gray-700 text-sm truncate">Select field</div>
            </div>
            
            <div className="w-24 bg-gray-200 rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-300 transition-colors">
                <div className="text-gray-700 text-sm text-center truncate">
                    {isCondition ? 'Operator' : 'Join type'}
                </div>
            </div>
            
            <div className={`flex-1 min-w-[120px] ${rightColor} rounded-lg px-3 py-2 cursor-pointer hover:opacity-80 transition-opacity`}>
                <div className="text-gray-700 text-sm truncate">Select field</div>
            </div>
        </div>
    );
}