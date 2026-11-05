import React, { useState } from 'react';
import { 
  Database, 
  Play, 
  RotateCcw, 
  Table, 
  Trash2, 
  Terminal, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { storageService, SqlQueryResult } from '../../services/storage';

export const SqliteConsole: React.FC = () => {
  const [sqlInput, setSqlInput] = useState<string>('SELECT * FROM quiz_results ORDER BY score DESC LIMIT 10;');
  const [queryResult, setQueryResult] = useState<SqlQueryResult | null>(() => 
    storageService.executeSql('SELECT * FROM quiz_results ORDER BY score DESC LIMIT 10;')
  );

  const sampleQueries = [
    { label: 'View Top Results', sql: 'SELECT * FROM quiz_results ORDER BY score DESC LIMIT 10;' },
    { label: 'View All Users', sql: 'SELECT * FROM users;' },
    { label: 'View Programming Questions', sql: "SELECT * FROM questions WHERE category = 'Programming' LIMIT 5;" },
    { label: 'View Math Questions', sql: "SELECT * FROM questions WHERE category = 'Mathematics' LIMIT 5;" },
    { label: 'Clear Results Table', sql: 'DELETE FROM quiz_results;' },
    { label: 'Reset Entire Database', sql: 'RESET DATABASE;' },
  ];

  const handleRunQuery = (sqlToRun?: string) => {
    const target = sqlToRun || sqlInput;
    const res = storageService.executeSql(target);
    setQueryResult(res);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 overflow-hidden">
      {/* Top Header */}
      <div className="shrink-0 px-6 py-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400">
            <Database className="w-4 h-4" />
            <span>SQLITE 3 ENGINE (sqflite RELATIONAL SIMULATION)</span>
          </div>
          <h2 className="text-lg font-bold text-white mt-0.5">
            Interactive SQLite Database Console
          </h2>
        </div>

        <button
          onClick={() => handleRunQuery('RESET DATABASE;')}
          className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 flex items-center gap-1.5 transition-all cursor-pointer border border-slate-700"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Tables to Default</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left: Query Editor & Quick Presets */}
        <div className="w-full md:w-96 shrink-0 border-r border-slate-800 bg-slate-900/30 p-4 flex flex-col gap-4 overflow-y-auto">
          <div>
            <label className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block mb-2">
              SQL Query Input
            </label>
            <div className="relative">
              <textarea
                value={sqlInput}
                onChange={(e) => setSqlInput(e.target.value)}
                rows={5}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none leading-relaxed"
                placeholder="Enter SQL command (e.g. SELECT * FROM quiz_results;)"
              />
            </div>
            <button
              onClick={() => handleRunQuery()}
              className="w-full mt-2 h-10 rounded-xl bg-purple-600 hover:bg-purple-700 active:scale-98 transition-all text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-purple-900/30 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Execute SQL Query</span>
            </button>
          </div>

          <div>
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Preset CRUD Queries (Academic Demos)
            </span>
            <div className="space-y-1.5">
              {sampleQueries.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSqlInput(q.sql);
                    handleRunQuery(q.sql);
                  }}
                  className="w-full text-left p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 transition-all cursor-pointer flex items-center justify-between"
                >
                  <span className="font-medium truncate">{q.label}</span>
                  <span className="text-[10px] font-mono text-purple-400 ml-2">RUN</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] text-slate-400 font-mono">
            <span className="text-purple-400 font-bold">Tables Available:</span>
            <div className="mt-1 space-y-0.5">
              <div>• users</div>
              <div>• questions</div>
              <div>• quiz_results</div>
            </div>
          </div>
        </div>

        {/* Right: Results Table View */}
        <div className="flex-1 flex flex-col bg-slate-950 overflow-hidden">
          {/* Status Message */}
          <div className="shrink-0 px-6 py-3 border-b border-slate-800 bg-slate-900/40 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              {queryResult?.error ? (
                <>
                  <AlertCircle className="w-4 h-4 text-rose-400" />
                  <span className="text-rose-400 font-semibold">{queryResult.error}</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">{queryResult?.message || 'Query executed successfully'}</span>
                </>
              )}
            </div>
            <span className="text-slate-500">{queryResult?.rows?.length || 0} rows</span>
          </div>

          {/* Table Container */}
          <div className="flex-1 overflow-auto p-4">
            {queryResult && queryResult.columns.length > 0 && queryResult.rows.length > 0 ? (
              <div className="rounded-xl border border-slate-800 overflow-hidden">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-900 text-purple-300 border-b border-slate-800">
                    <tr>
                      {queryResult.columns.map((col) => (
                        <th key={col} className="py-2.5 px-3 uppercase text-[10px] tracking-wider whitespace-nowrap">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 bg-slate-950/80 text-slate-300">
                    {queryResult.rows.map((row, rowIdx) => (
                      <tr key={rowIdx} className="hover:bg-slate-900/50">
                        {queryResult.columns.map((col) => (
                          <td key={col} className="py-2.5 px-3 max-w-xs truncate whitespace-nowrap">
                            {row[col] === null || row[col] === undefined
                              ? <span className="text-slate-600 italic">null</span>
                              : String(row[col])}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-500 text-xs">
                <Table className="w-8 h-8 text-slate-700 mb-2" />
                <p>Run a SELECT query to preview rows.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
