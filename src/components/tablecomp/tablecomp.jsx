import React from 'react';

export default function Tablecomp({ cols,data }) {
    return (
        <div className="bg-white rounded-lg shadow">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {cols.map((col) => (
                                <th key={col} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{col}</th>
                            ))}
                            <th className="px-6 py-3 pr-24 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.map((row) => (
                            <tr key={row.id}>
                                {row.map((value) => (
                                    <td key={value} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{value}</td>
                                ))}
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-indigo-600 hover:text-indigo-900 px-6">Edit</button>
                                    <button className="text-red-600 hover:text-red-900 px-6">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
  }