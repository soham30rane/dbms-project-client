import React, { useState, useEffect } from 'react';

export default function InsertRow({ 
    isOpen, 
    onClose, 
    onSubmit, 
    schema, 
    id = -1, 
    rowData = {} 
}) {
    const tablename = localStorage.getItem('tablename') || 'users';
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (id === -1) {
            // Initialize empty form for insert
            const initialData = {};
            schema[tablename].forEach(field => {
                if (field !== 'id') {
                    initialData[field] = '';
                }
            });
            setFormData(initialData);
        } else {
            const initialData = {};
            let i=0;
            schema[tablename].forEach(field => {
                if (field !== 'id') {
                    initialData[field] = rowData[i];
                }
                i++;
            });
            console.log('initialData:', initialData);
            setFormData(initialData);
        }
    }, [id, schema, tablename, rowData]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="relative bg-white rounded-lg shadow-xl w-96">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="text-lg font-semibold text-gray-900">
                        {id === -1 ? 'Insert New Row' : 'Edit Row'}
                    </h3>
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500"
                    >
                        ✕
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit(formData);
                }}>
                    <div className="p-4 space-y-4">
                        {schema[tablename].map(field => (
                            field !== 'id' && (
                                <div key={field}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {field}
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData[field] || ''}
                                        onChange={(e) => setFormData(prev => ({
                                            ...prev,
                                            [field]: e.target.value
                                        }))}
                                    />
                                </div>
                            )
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-2 p-4 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn btn-ghost"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            {id === -1 ? 'Insert' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}