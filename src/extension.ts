import * as vscode from "vscode";
const fs = require("fs");

function isPathValid(path: string): boolean {
    try {
        // Kiểm tra xem tệp hoặc thư mục có tồn tại không
        fs.accessSync(path, fs.constants.F_OK);
        return true; // Đường dẫn hợp lệ
    } catch (err) {
        return false; // Đường dẫn không hợp lệ
    }
}
const runCommand = (command: string, path: string) => {
    if (!command || !path) {
        return;
    }
    const terminal = vscode.window.createTerminal({
        name: "Auto command",
        cwd: path,
    });
    terminal.sendText(command);
    terminal.show();
};
export function activate(context: vscode.ExtensionContext) {
    const config = vscode.workspace.getConfiguration();
    const command = config.get("command", "npm start");
    const projectPath = config.get("projectPath", "");
    const workspaceFolders = vscode.workspace.workspaceFolders;

    if (isPathValid(projectPath)) {
        runCommand(command, projectPath);
    } else if (workspaceFolders?.length) {
        const firstProjectInWorkspace = workspaceFolders[0].uri.fsPath;
        runCommand(command, firstProjectInWorkspace);
    }
}

export function deactivate() {}
