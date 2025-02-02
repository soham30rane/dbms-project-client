import React, { useState } from 'react';
import JoinBlock from '../joinblock/joinblock';
import ConditionBlock from '../conditionblock/conditionblock';

const colorPairs = [
  { left: 'bg-blue-200', right: 'bg-purple-200' },
  { left: 'bg-green-200', right: 'bg-yellow-200' },
  { left: 'bg-pink-200', right: 'bg-orange-200' },
];

const conditionColors = [
  { left: 'bg-teal-200', right: 'bg-indigo-200' },
  { left: 'bg-rose-200', right: 'bg-cyan-200' },
];

export default function Query({
    schema
}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [description, setDescription] = useState('QUERY DESCRIPTION');
    const [logicOp, setLogicOp] = useState(['','AND', 'OR','OR','OR','OR']);
    // const [leftvalue,setLeftvalue] = useState("")
    // const [rightvalue,setRightvalue] = useState("")
    // const [middlevalue,setMiddlevalue] = useState("")


    const addJoin = () => {
        let newLeftvalues = [...leftvalues];
        let newRightvalues = [...rightvalues];
        let newMiddlevalues = [...middlevalues];
        newLeftvalues.push('');
        newRightvalues.push('');
        newMiddlevalues.push('');
        setLeftvalues(newLeftvalues);
        setRightvalues(newRightvalues);
        setMiddlevalues(newMiddlevalues);
    }

    const addCondition = () => {
        let newLeftvalues = [...leftvaluesCond];
        let newRightvalues = [...rightvaluesCond];
        let newMiddlevalues = [...middlevaluesCond];
        newLeftvalues.push('');
        newRightvalues.push('');
        newMiddlevalues.push('');
        setLeftvaluesCond(newLeftvalues);
        setRightvaluesCond(newRightvalues);
        setMiddlevaluesCond(newMiddlevalues);
    }

    const [leftvaluesCond,setLeftvaluesCond] = useState([])
    const [rightvaluesCond,setRightvaluesCond] = useState([])
    const [middlevaluesCond,setMiddlevaluesCond] = useState([])

    const setLeftvalueCond = (index,value) => {
        const newLeftvalues = [...leftvaluesCond];
        newLeftvalues[index] = value;
        setLeftvaluesCond(newLeftvalues);
    }

    const setRightvalueCond = (index,value) => {
        const newRightvalues = [...rightvaluesCond];
        newRightvalues[index] = value;
        setRightvaluesCond(newRightvalues);
    }

    const setMiddlevalueCond = (index,value) => {
        const newMiddlevalues = [...middlevaluesCond];
        newMiddlevalues[index] = value;
        setMiddlevaluesCond(newMiddlevalues);
    }

    const [leftvalues,setLeftvalues] = useState([])
    const [rightvalues,setRightvalues] = useState([])
    const [middlevalues,setMiddlevalues] = useState([])

    const setLeftvalue = (index,value) => {
        const newLeftvalues = [...leftvalues];
        newLeftvalues[index] = value;
        setLeftvalues(newLeftvalues);
    }

    const setRightvalue = (index,value) => {
        const newRightvalues = [...rightvalues];
        newRightvalues[index] = value;
        setRightvalues(newRightvalues);
    }

    const setMiddlevalue = (index,value) => {
        const newMiddlevalues = [...middlevalues];
        newMiddlevalues[index] = value;
        setMiddlevalues(newMiddlevalues);
    }

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
                    <p className="text-gray-600 truncate">{description || 'New Query'}</p>
                    <div className="space-x-2">
                        <button 
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="btn btn-sm btn-ghost">
                            {isExpanded ? 'Save' : 'Edit'}
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
                            {leftvalues.map((_,index) => (
                                <JoinBlock 
                                    key={index}
                                    leftColor={colorPairs[index % colorPairs.length].left}
                                    rightColor={colorPairs[index % colorPairs.length].right}
                                    leftvalue={leftvalues[index]}
                                    rightvalue={rightvalues[index]}
                                    middlevalue={middlevalues[index]}
                                    setLeftvalue={(value) => setLeftvalue(index,value)}
                                    setRightvalue={(value) => setRightvalue(index,value)}
                                    setMiddleValue={(value) => setMiddlevalue(index,value)}
                                    schema={schema}
                                />
                            ))}
                            <button className="btn btn-sm btn-outline w-full mt-2" onClick={addJoin}>
                                + Add Join
                            </button>
                        </div>
                    </div>

                    {/* Conditions Section */}
                    <div className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">CONDITIONS</h3>
                        <div className="space-y-2">
                            {leftvaluesCond.map((_,index) => (<>
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
                                <ConditionBlock
                                    key={index}
                                    leftColor={conditionColors[index % conditionColors.length].left}
                                    rightColor={conditionColors[index % conditionColors.length].right}
                                    leftvalue={leftvaluesCond[index]}
                                    rightvalue={rightvaluesCond[index]}
                                    middlevalue={middlevaluesCond[index]}
                                    setLeftvalue={(value) => setLeftvalueCond(index,value)}
                                    setRightvalue={(value) => setRightvalueCond(index,value)}
                                    setMiddleValue={(value) => setMiddlevalueCond(index,value)}
                                    schema={schema}
                                />
                                </>
                            ))}
                            
                            <button className="btn btn-sm btn-outline w-full mt-2" onClick={addCondition}>
                                + Add Condition
                            </button>
                        </div>
                    </div>

                    {/* Description Section */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">DESCRIPTION</h3>
                        <textarea 
                            className="w-full p-2 border rounded-lg resize-none h-24"
                            // placeholder="Enter query description..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}