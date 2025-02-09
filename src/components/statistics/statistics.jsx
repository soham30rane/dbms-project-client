import React, { useState, useEffect } from 'react';
import Sidebar from '../sidebar/sidebar';
import Tablecomp from '../tablecomp/tablecomp';

const Statistics = () => {
  const [stats, setStats] = useState({
    customerDemographics: { cols: [], data: [] },
    topProducts: { cols: [], data: [] },
    categoryPerformance: { cols: [], data: [] },
    dealerMetrics: { cols: [], data: [] },
    customerAnalysis: { cols: [], data: [] },
    deliveryStatus: { cols: [], data: [] },
    stockAnalysis: { cols: [], data: [] }
  });

  const schema = {
    "users": ["id","firstname","lastname","phone","email","age","country","address"],
    "products": ["id","title","price","stock","category","descrp","dealer_id"],
    "orders": ["id","user_id","product_id","quantity","cost","del_status"],
    "dealers": ["id","name","phone","email","country","address"],
  };

  const queries = {
    customerDemographics: `
      SELECT country, COUNT(*) as total_customers, 
      AVG(age) as avg_age, MIN(age) as youngest, 
      MAX(age) as oldest FROM users GROUP BY country 
      ORDER BY total_customers DESC;
    `,
    topProducts: `
      SELECT p.title, COUNT(o.id) as total_orders, 
      SUM(o.quantity) as units_sold, SUM(o.cost) as total_revenue 
      FROM products p JOIN orders o ON p.id = o.product_id 
      GROUP BY p.id, p.title ORDER BY units_sold DESC;
    `,
    categoryPerformance: `
      SELECT p.category, COUNT(o.id) as order_count, 
      SUM(o.cost) as total_sales, AVG(o.cost) as avg_order_value 
      FROM products p JOIN orders o ON p.id = o.product_id 
      GROUP BY p.category ORDER BY total_sales DESC;
    `,
    dealerMetrics: `
      SELECT d.name as dealer_name, COUNT(p.id) as products_listed, 
      AVG(p.price) as avg_product_price 
      FROM dealers d JOIN products p ON d.id = p.dealer_id 
      GROUP BY d.id, d.name ORDER BY products_listed DESC;
    `,
    customerAnalysis: `
      SELECT CONCAT(u.firstname, ' ', u.lastname) as customer_name, 
      COUNT(o.id) as total_orders, SUM(o.cost) as total_spent, 
      AVG(o.cost) as avg_order_value, MAX(o.cost) as highest_purchase 
      FROM users u JOIN orders o ON u.id = o.user_id 
      GROUP BY u.id, u.firstname, u.lastname ORDER BY total_spent DESC;
    `,
    deliveryStatus: `
      SELECT del_status, COUNT(*) as order_count, 
      SUM(cost) as total_value, AVG(cost) as avg_order_value 
      FROM orders GROUP BY del_status ORDER BY order_count DESC;
    `,
    stockAnalysis: `
      SELECT category, COUNT(*) as total_products, 
      SUM(stock) as total_stock, AVG(stock) as avg_stock, 
      MIN(stock) as min_stock, MAX(stock) as max_stock 
      FROM products GROUP BY category ORDER BY total_stock DESC;
    `
  };

  const onRunQuery = async (query) => {
    try {
      const response = await fetch('http://localhost:5000/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      
      if (!response.ok) {
        const data = await response.json();
        console.error('Query failed:', data.error);
        return null;
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };

  const updateStats = (statKey, results) => {
    if (!results || results.length === 0) return;
    
    const keys = Object.keys(results[0]);
    const cols = keys.map(key => key);
    const data = results.map(result => keys.map(key => result[key]));
    
    setStats(prev => ({
      ...prev,
      [statKey]: { cols, data }
    }));
  };

  useEffect(() => {
    const fetchAllStats = async () => {
      for (const [key, query] of Object.entries(queries)) {
        const results = await onRunQuery(query);
        updateStats(key, results);
      }
    };
    
    fetchAllStats();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar tables={Object.keys(schema)} />
      
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <main className="p-6 space-y-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Statistics Dashboard</h1>
          
          {/* Customer Demographics */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Customer Demographics by Country</h2>
            <Tablecomp cols={stats.customerDemographics.cols} data={stats.customerDemographics.data} />
          </section>

          {/* Top Selling Products */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Top Selling Products</h2>
            <Tablecomp cols={stats.topProducts.cols} data={stats.topProducts.data} />
          </section>

          {/* Category Performance */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Sales Performance by Category</h2>
            <Tablecomp cols={stats.categoryPerformance.cols} data={stats.categoryPerformance.data} />
          </section>

          {/* Dealer Metrics */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Dealer Performance Metrics</h2>
            <Tablecomp cols={stats.dealerMetrics.cols} data={stats.dealerMetrics.data} />
          </section>

          {/* Customer Analysis */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Customer Purchase Analysis</h2>
            <Tablecomp cols={stats.customerAnalysis.cols} data={stats.customerAnalysis.data} />
          </section>

          {/* Delivery Status */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Delivery Status Summary</h2>
            <Tablecomp cols={stats.deliveryStatus.cols} data={stats.deliveryStatus.data} />
          </section>

          {/* Stock Analysis */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Stock Level Analysis</h2>
            <Tablecomp cols={stats.stockAnalysis.cols} data={stats.stockAnalysis.data} />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Statistics;