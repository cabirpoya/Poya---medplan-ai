import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

process.env.DIST = join(__dirname, '../dist');
// Fix: Since public was moved to src/public, point to ../src/public in development
process.env.PUBLIC = app.isPackaged ? process.env.DIST : join(__dirname, '../src/public');

let mainWindow: BrowserWindow | null = null;

const preload = join(__dirname, '../preload/index.js');
const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = join(process.env.DIST, 'index.html');

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload,
      nodeIntegration: false,
      contextIsolation: true,
    },
    title: 'POYA - MEDPLANTAi',
    autoHideMenuBar: true,
    icon: join(process.env.PUBLIC, 'logo.png'),
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(indexHtml);
  }

  // Open external links in browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url);
    return { action: 'deny' };
  });

  ipcMain.handle('get-app-version', () => app.getVersion());
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if ((process as any).platform !== 'darwin') app.quit();
});