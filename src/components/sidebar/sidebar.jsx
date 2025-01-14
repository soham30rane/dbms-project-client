export default function Sidebar({ tables }) {
    return (
        <div className="w-64 bg-gray-900 text-gray-100 flex flex-col">
            <div className="p-4 border-b border-gray-800">
            <h1 className="text-xl font-bold">Database Manager</h1>
            </div>
            <div className="flex-1 overflow-y-auto">
            <div className="p-4">
                <h2 className="text-sm font-semibold text-gray-400 uppercase">Tables</h2>
                <nav className="mt-4 space-y-2">
                {tables.map((table) => (
                    <a key={table} href='.' className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors">
                    <span className="ml-3">{table}</span>
                    </a>
                ))}
                </nav>
            </div>
            </div>
        </div>
    );
  }