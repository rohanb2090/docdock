export type FileType = 'document' | 'image' | 'spreadsheet' | 'presentation' | 'archive' | 'code' | 'other';
export type ConfidenceLevel = 'high' | 'medium' | 'low';
export type SuggestionType = 'rename' | 'merge' | 'move' | 'delete';
export type SuggestionStatus = 'pending' | 'approved' | 'rejected' | 'applied';

export interface ScannedFile {
  id: string;
  name: string;
  path: string;
  type: FileType;
  size: number;
  modified: Date;
  category?: string;
}

export interface Suggestion {
  id: string;
  type: SuggestionType;
  files: ScannedFile[];
  originalName?: string;
  suggestedName?: string;
  suggestedPath?: string;
  reason: string;
  confidence: ConfidenceLevel;
  status: SuggestionStatus;
  createdAt: Date;
}

export interface ScanResult {
  id: string;
  folderPath: string;
  scannedAt: Date;
  totalFiles: number;
  categories: { name: string; count: number; type: FileType }[];
  suggestions: Suggestion[];
}

export interface HistoryEntry {
  id: string;
  action: string;
  files: string[];
  appliedAt: Date;
  canUndo: boolean;
}

export interface NamingRule {
  id: string;
  name: string;
  pattern: string;
  example: string;
  enabled: boolean;
}

// Mock scanned files
export const mockFiles: ScannedFile[] = [
  { id: '1', name: 'Q4 Report Final v2 FINAL.docx', path: '/Documents/Work/', type: 'document', size: 245000, modified: new Date('2024-12-15'), category: 'Reports' },
  { id: '2', name: 'Q4 Report Final.docx', path: '/Documents/Work/', type: 'document', size: 240000, modified: new Date('2024-12-10'), category: 'Reports' },
  { id: '3', name: 'meeting_notes_dec.txt', path: '/Documents/Work/', type: 'document', size: 12000, modified: new Date('2024-12-20'), category: 'Notes' },
  { id: '4', name: 'IMG_20241201_142356.jpg', path: '/Downloads/', type: 'image', size: 3200000, modified: new Date('2024-12-01'), category: 'Photos' },
  { id: '5', name: 'budget_2024_updated.xlsx', path: '/Documents/Finance/', type: 'spreadsheet', size: 89000, modified: new Date('2024-11-28'), category: 'Finance' },
  { id: '6', name: 'budget_2024.xlsx', path: '/Documents/Finance/', type: 'spreadsheet', size: 85000, modified: new Date('2024-11-15'), category: 'Finance' },
  { id: '7', name: 'presentation_draft_v3.pptx', path: '/Documents/Work/', type: 'presentation', size: 5600000, modified: new Date('2024-12-18'), category: 'Presentations' },
  { id: '8', name: 'old_project.zip', path: '/Downloads/', type: 'archive', size: 125000000, modified: new Date('2024-06-01'), category: 'Archives' },
  { id: '9', name: 'script.py', path: '/Projects/automation/', type: 'code', size: 4500, modified: new Date('2024-12-22'), category: 'Code' },
  { id: '10', name: 'Invoice_Dec2024_ClientA.pdf', path: '/Documents/Invoices/', type: 'document', size: 156000, modified: new Date('2024-12-19'), category: 'Invoices' },
];

// Mock suggestions
export const mockSuggestions: Suggestion[] = [
  {
    id: 's1',
    type: 'rename',
    files: [mockFiles[0]],
    originalName: 'Q4 Report Final v2 FINAL.docx',
    suggestedName: '2024-Q4-Report.docx',
    reason: 'Standardize naming: Remove redundant version markers, use date prefix',
    confidence: 'high',
    status: 'pending',
    createdAt: new Date('2024-12-23'),
  },
  {
    id: 's2',
    type: 'merge',
    files: [mockFiles[0], mockFiles[1]],
    reason: 'Potential duplicates detected: Both files appear to be versions of the same Q4 report',
    confidence: 'medium',
    status: 'pending',
    createdAt: new Date('2024-12-23'),
  },
  {
    id: 's3',
    type: 'rename',
    files: [mockFiles[3]],
    originalName: 'IMG_20241201_142356.jpg',
    suggestedName: '2024-12-01-Photo.jpg',
    reason: 'Convert camera timestamp to readable date format',
    confidence: 'high',
    status: 'pending',
    createdAt: new Date('2024-12-23'),
  },
  {
    id: 's4',
    type: 'move',
    files: [mockFiles[3]],
    suggestedPath: '/Pictures/2024/December/',
    reason: 'Organize photos by date into Pictures folder',
    confidence: 'high',
    status: 'pending',
    createdAt: new Date('2024-12-23'),
  },
  {
    id: 's5',
    type: 'merge',
    files: [mockFiles[4], mockFiles[5]],
    reason: 'Potential duplicates: Both are budget files for 2024 with similar content',
    confidence: 'medium',
    status: 'pending',
    createdAt: new Date('2024-12-23'),
  },
  {
    id: 's6',
    type: 'delete',
    files: [mockFiles[7]],
    reason: 'Old archive from 6+ months ago in Downloads folder',
    confidence: 'low',
    status: 'pending',
    createdAt: new Date('2024-12-23'),
  },
];

// Mock scan result
export const mockScanResult: ScanResult = {
  id: 'scan1',
  folderPath: '/Users/demo/Documents',
  scannedAt: new Date('2024-12-23'),
  totalFiles: 247,
  categories: [
    { name: 'Documents', count: 89, type: 'document' },
    { name: 'Images', count: 67, type: 'image' },
    { name: 'Spreadsheets', count: 34, type: 'spreadsheet' },
    { name: 'Presentations', count: 18, type: 'presentation' },
    { name: 'Archives', count: 23, type: 'archive' },
    { name: 'Code', count: 16, type: 'code' },
  ],
  suggestions: mockSuggestions,
};

// Mock history
export const mockHistory: HistoryEntry[] = [
  { id: 'h1', action: 'Renamed 12 files', files: ['doc1.pdf', 'doc2.pdf', '...'], appliedAt: new Date('2024-12-22'), canUndo: true },
  { id: 'h2', action: 'Moved 5 files to /Archive/', files: ['old1.zip', 'old2.zip', '...'], appliedAt: new Date('2024-12-20'), canUndo: true },
  { id: 'h3', action: 'Merged 2 duplicate files', files: ['report_v1.docx', 'report_v2.docx'], appliedAt: new Date('2024-12-18'), canUndo: false },
];

// Mock naming rules
export const mockRules: NamingRule[] = [
  { id: 'r1', name: 'Date Prefix', pattern: 'YYYY-MM-DD-{filename}', example: '2024-12-23-Report.docx', enabled: true },
  { id: 'r2', name: 'Camera Photos', pattern: 'YYYY-MM-DD-Photo-{n}', example: '2024-12-01-Photo-001.jpg', enabled: true },
  { id: 'r3', name: 'Invoices', pattern: 'Invoice-{client}-{YYYY-MM}', example: 'Invoice-ClientA-2024-12.pdf', enabled: true },
  { id: 'r4', name: 'Remove Spaces', pattern: '{filename} → {filename-no-spaces}', example: 'my document.pdf → my-document.pdf', enabled: false },
];

// Helper functions
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function getFileTypeIcon(type: FileType): string {
  const icons: Record<FileType, string> = {
    document: '📄',
    image: '🖼️',
    spreadsheet: '📊',
    presentation: '📽️',
    archive: '📦',
    code: '💻',
    other: '📁',
  };
  return icons[type];
}
