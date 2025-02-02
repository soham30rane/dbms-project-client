import React, { useState } from 'react';
import Sidebar from '../sidebar/sidebar';
import Tablecomp from '../tablecomp/tablecomp';
import Query from '../query/query';

const Dashboard = () => {
  const [queries, setQueries] = useState([])
  // const [tablename, setTablename] = useState('users');
  // using localSorage to get the table name
  const tablename = localStorage.getItem('tablename') || 'users';

  const addQuery = () => {
    let newQueries = [...queries];
    newQueries.push('');
    setQueries(newQueries);
  }

  const schema = {
    "users" : ["id","firstname","lastname","phone","email","age","country","address"],
    "products" : ["id","title","price","stock","category","description","dealer_id"],
    "orders" : ["id","user_id","product_id","quantity","cost","status"],
    "dealers" : ["id","name","phone","email","country","address"],
  }

  const sampleData = {
    "users" : [
      [1,"John","Doe","991992389","john@email.com",25,"US","333 second street, ellionas, California"],
      [2,"Jane","Doe","991992389","jane@email.com",22,"CA","22 abc road, Cannada"],
      [3,"Darsh","Shah","991992389","dkshah_b23@it.vjti.ac.in",19,"IND","83 gurukrupa, Boriwali, Mumbai"],
      [4,"Frank","Doe","991992389","frank@.com",40,"IND","83 gurukrupa, Boriwali, Mumbai"],
      [5,"Grace","Doe","991992389","grace@.com",33,"IND","83 gurukrupa, Boriwali, Mumbai"],
      [6,"Hannah","Doe","991992389","hannah@.com",29,"IND","83 gurukrupa, Boriwali, Mumbai"],
    ],
    "products" : [
      [1,"Laptop","50000",10,"Electronics","Dell Inspiron 15 3000 series",1],
      [2,"Mobile","20000",20,"Electronics","Samsung Galaxy M31",2],
      [3,"Shoes","2000",50,"Footwear","Nike Air Max",3],
      [4,"Shirt","1000",100,"Clothing","Peter England",4],
      [5,"Earphones","500",30,"Electronics","Boat Bassheads 100",5],
      [6,"Watch","5000",10,"Accessories","Fastrack",6],
      [7,"Sunglasses","3000",10,"Accessories","Rayban",7],
      [8,"Jeans","1500",50,"Clothing","Levis",8],
      [9,"Cap","500",100,"Accessories","Puma",9],
      [10,"Bag","2000",30,"Accessories","Skybags",10],
    ],
    "orders" : [
      [1,1,1,1,50000,"Delivered"],
      [2,2,2,2,40000,"Delivered"],
      [3,3,3,1,2000,"Delivered"],
      [4,4,4,2,2000,"Delivered"],
      [5,5,5,1,500,"Delivered"],
      [6,6,6,1,5000,"Delivered"],
      [7,7,7,1,3000,"Delivered"],
      [8,8,8,2,2000,"Delivered"],
      [9,9,9,1,500,"Delivered"],
      [10,10,10,1,2000,"Delivered"],
    ],
    "dealers" : [
      [1,"Dell","991992389","dell@.com","US","333 second street, ellionas, California"],
      [2,"Samsung","991992389","samsung@.com","CA","22 abc road, Cannada"],
      [3,"Nike","991992389","nike@.com","US","421 xyz street, ellionas, California"],
      [4,"Peter England","991992389","peter@.com","CA","22 abc road, Cannada"],
      [5,"Boat","991992389","boat@.com","US","213 pqr street, ellionas, California"],
      [6,"Fastrack","991992389","fastrack@.com","CA","11 abc road, Cannada"],
      [7,"Rayban","991992389","rayban@.com","US","213 pqr street, ellionas, California"],
      [8,"Levis","991992389","levis@.com","CA","11 abc road, Cannada"],
      [9,"Puma","991992389","puma@.com","US","213 pqr street, ellionas, California"],
      [10,"Skybags","991992389","skybags@.com","CA","11 abc road, Cannada"],
    ],
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar tables={Object.keys(schema)}/>

      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <main className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Users Table</h1>
            <p className="text-sm text-gray-500">showing: all</p>
          </div>

          {/* Table Section */}
          <Tablecomp cols={schema[tablename]} data={sampleData[tablename]} />

          {/* Actions */}
          <div className="mt-6">
            <button className="btn btn-primary">Insert Row</button>
          </div>

          {/* Queries Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Queries</h2>
            <div className="space-y-4">
              {/* Query Card */}
              {queries.map((query, index) => <Query schema={schema}/>)}
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