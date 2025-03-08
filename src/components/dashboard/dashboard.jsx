import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar/sidebar';
import Tablecomp from '../tablecomp/tablecomp';
import Query from '../query/query';
import { data } from 'autoprefixer';
import InsertRow from '../insertrow/insertrow';

const Dashboard = () => {
  const [queries, setQueries] = useState([])
  // const [tablename, setTablename] = useState('users');
  // using localSorage to get the table name
  const tablename = localStorage.getItem('tablename') || 'users';
  const [tableCols, setTableCols] = useState([]);
  const [tableData, setTableData] = useState([]);
    // Add state for modal
  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);
  const [editId, setEditId] = useState(-1);
  const [editData, setEditData] = useState({});

  const addQuery = () => {
    let newQueries = [...queries];
    newQueries.push('');
    setQueries(newQueries);
  }

  const schema = {
    "users" : ["id","firstname","lastname","phone","email","age","country","address"],
    "products" : ["id","title","price","stock","category","descrp","dealer_id"],
    "orders" : ["id","user_id","product_id","quantity","cost","del_status"],
    "dealers" : ["id","name","phone","email","country","address"],
  }

  const onRunQuery = async (query) => {
    console.log(query);
    try {
      const response = await fetch('http://localhost:5000/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query })
      });
      
      if (!response.ok) {
        console.log('Query failed:', response);
        data = await response.json();
        alert('Error: Query failed '+ data.error);
        return false;
        // throw new Error('Query failed');
      }
      
      const results = await response.json();
      console.log('Query results:');
      console.log(results);
      updateTable(results);
      return true;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  const updateTable = (results) => {
    try {
      if(results.length === 0) {
        setTableData([]);
        return
      };
      const keys = Object.keys(results[0]);
      const cols = keys.map(key => key);
      const data = results.map(result => keys.map(key => result[key]));
      console.log(cols);
      console.log(data);
      setTableCols(cols);
      setTableData(data);
    } catch (error) {
      fetchInitialData()
      // console.error('Error updating table:', error);

    }
  }

  const fetchInitialData = async () => {
    try {
      await onRunQuery(`SELECT * FROM ${tablename};`);
    } catch (error) {
      console.error('Initial data fetch failed:', error);
    }
  };

  const updateRows = async (data) => {
    try {
      const keys = Object.keys(data);
      const cols = keys.map(key => key);
      const values = keys.map(key => data[key]);
      if (editId === -1) {
        const query = `INSERT INTO ${tablename} (${cols.join(',')}) VALUES ('${values.join("','")}');`;
        console.log(query);
        let success = await onRunQuery(query);

        if(tablename === 'orders' && success){
          await onRunQuery(`CALL update_stock_after_order(${data.product_id},${data.quantity});`);
        }
      } else {
        const setValues = keys.map(key => `${key} = '${data[key]}'`);
        const query = `UPDATE ${tablename} SET ${setValues.join(',')} WHERE id = ${editId};`;
        console.log(query);
        await onRunQuery(query);
      }
      setEditId(-1);
    } catch (error) {
      console.error('Error updating table:', error);
    }
  }

  useEffect(() => {
    fetchInitialData();
  }, [tablename]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar tables={Object.keys(schema)}/>

      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <main className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">{ tablename }</h1>
            {/* <p className="text-sm text-gray-500">showing: all</p> */}
          </div>

          {/* Table Section */}
          <Tablecomp 
          cols={tableCols} data={tableData} 
          onRunQuery={onRunQuery} setEditId={setEditId} setEditData={setEditData}
          setIsInsertModalOpen={setIsInsertModalOpen} showActions={true} />

          {/* Actions */}
          <div className="mt-6">
          <button 
              className="btn btn-primary"
              onClick={() => {
                  setEditId(-1);
                  setEditData({});
                  setIsInsertModalOpen(true);
              }}
          >
              Insert Row
          </button>
          </div>

          <InsertRow 
              isOpen={isInsertModalOpen}
              onClose={() => setIsInsertModalOpen(false)}
              onSubmit={(data) => {
                  // Will implement later
                  updateRows(data);
                  console.log(data);
                  setIsInsertModalOpen(false);
              }}
              schema={schema}
              id={editId}
              rowData={editData}
          />

          {/* Queries Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Queries</h2>
            <div className="space-y-4">
              {/* Query Card */}
              {queries.map((query, index) => 
              <Query schema={schema} onRunQuery={onRunQuery}/>)}
              {/* Add Query Button */}
              <button className="w-full btn btn-outline btn-dashed" onClick={addQuery}>
                + Add New Query
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;