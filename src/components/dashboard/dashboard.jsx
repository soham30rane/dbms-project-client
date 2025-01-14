import React from 'react';
import Sidebar from '../sidebar/sidebar';
import Tablecomp from '../tablecomp/tablecomp';
import Query from '../query/query';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar tables={['Users', 'Products', 'Orders','dealers','Users', 'Products', 'Orders','dealers']} />

      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <main className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Users Table</h1>
            <p className="text-sm text-gray-500">showing: all</p>
          </div>

          {/* Table Section */}
          <Tablecomp cols={['ID', 'Name', 'Email', 'Age', 'Country','Phone','Address']} data={[
            [1, 'John Doe', 'johndoe@email.com', 25, 'US','991992389','333 second street, ellionas, California'],
            [2, 'Jane Doe', 'janedoe@email.com', 22, 'CA','991992389','333 second street, ellionas, California'],
            [3, 'Alice', 'alice@email.com', 30, 'US','991992389','333 second street, ellionas, California'],
            [4, 'Bob', 'bob@email.com', 18, 'CA','991992389','333 second street, ellionas, California'],
            ]} />

          {/* Actions */}
          <div className="mt-6">
            <button className="btn btn-primary">Insert Row</button>
          </div>

          {/* Queries Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Queries</h2>
            <div className="space-y-4">
              {/* Query Card */}
              <Query query={{ description: 'Get all users' }} />
              <Query query={{ description: 'Select all users where age is greater than 18 and country = \'US\'' }} />
              {/* Add Query Button */}
              <button className="w-full btn btn-outline btn-dashed">
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