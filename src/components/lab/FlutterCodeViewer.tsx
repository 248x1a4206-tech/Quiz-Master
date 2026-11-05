import React, { useState } from 'react';
import JSZip from 'jszip';
import { 
  FileCode, 
  Copy, 
  Check, 
  Download, 
  FolderTree, 
  Code2, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { FLUTTER_PROJECT_FILES, FlutterFile } from './flutterCodeRepository';

export const FlutterCodeViewer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<FlutterFile>(FLUTTER_PROJECT_FILES[0]);
  const [copied, setCopied] = useState(false);
  const [isZipping, setIsZipping] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    try {
      setIsZipping(true);
      const zip = new JSZip();

      // Add all project files into zip
      FLUTTER_PROJECT_FILES.forEach(file => {
        zip.file(file.path, file.code);
      });

      // Add a README.md for the lab project
      zip.file('README.md', `# QuizMaster - Smart Quiz Application (Flutter & SQLite)

Academic B.Tech Computer Science / Information Technology Lab Project.

## Tech Stack
- Flutter 3.x
- Dart 3.x
- SQLite (sqflite)
- State Management: Provider
- Charts: fl_chart
- Audio: audioplayers
- Local Storage: shared_preferences

## How to Run
\`\`\`bash
flutter pub get
flutter run
\`\`\`

Built for academic lab demonstration and viva voce evaluation.
`);

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'QuizMaster_Flutter_Project.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to create zip:', err);
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 overflow-hidden">
      {/* Top Header Bar */}
      <div className="shrink-0 px-6 py-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-purple-400">FLUTTER / DART / SQLITE</span>
            <span className="text-slate-600">·</span>
            <span className="text-xs text-slate-400">B.Tech Lab Deliverables</span>
          </div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Code2 className="w-5 h-5 text-purple-400" />
            <span>Complete Flutter Source Code Explorer</span>
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-all cursor-pointer border border-slate-700"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy Active File'}</span>
          </button>

          <button
            onClick={handleDownloadZip}
            disabled={isZipping}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-xs font-bold text-white flex items-center gap-2 shadow-lg shadow-purple-900/30 transition-all cursor-pointer active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>{isZipping ? 'Packaging ZIP...' : 'Download Full Flutter Project (.ZIP)'}</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout: File Tree & Code View */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar: File Tree */}
        <div className="w-72 shrink-0 border-r border-slate-800 bg-slate-900/40 flex flex-col overflow-y-auto">
          <div className="p-3 border-b border-slate-800/80 text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <FolderTree className="w-4 h-4 text-purple-400" />
            <span>Project Files ({FLUTTER_PROJECT_FILES.length})</span>
          </div>

          <div className="p-2 space-y-1">
            {FLUTTER_PROJECT_FILES.map((file) => {
              const isSelected = selectedFile.path === file.path;
              return (
                <button
                  key={file.path}
                  onClick={() => setSelectedFile(file)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-mono transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <FileCode className={`w-4 h-4 shrink-0 ${isSelected ? 'text-purple-400' : 'text-slate-500'}`} />
                    <span className="truncate">{file.path}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-auto p-4 border-t border-slate-800/80 bg-slate-900/60 text-xs text-slate-400">
            <p className="font-semibold text-slate-300 mb-1">Flutter Lab Spec</p>
            <p className="text-[11px] leading-relaxed text-slate-400">
              Files are fully compliant with Dart 3.x null safety, Material 3 conventions, and sqflite CRUD contracts.
            </p>
          </div>
        </div>

        {/* Right Pane: Code Viewer */}
        <div className="flex-1 flex flex-col bg-slate-950 overflow-hidden">
          {/* File Tab Info */}
          <div className="shrink-0 px-6 py-3 border-b border-slate-800/80 bg-slate-900/30 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <span className="font-mono font-bold text-purple-300">{selectedFile.path}</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400 text-[11px]">{selectedFile.description}</span>
            </div>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
              {selectedFile.language}
            </span>
          </div>

          {/* Code display with line numbers */}
          <div className="flex-1 overflow-auto p-6 font-mono text-xs leading-relaxed text-slate-300 bg-slate-950">
            <pre className="select-text whitespace-pre">
              <code>{selectedFile.code}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
