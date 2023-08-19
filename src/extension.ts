import { cwd } from "process";
import * as vscode from "vscode";
export function activate(context: vscode.ExtensionContext) {
    const config = vscode.workspace.getConfiguration("extensionSettings");
    const command = config.get("command", "npm start");

    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders?.length && command) {
        const firstWorkspacePath = workspaceFolders[0].uri.fsPath;
        const terminal = vscode.window.createTerminal({
            name: "Auto command",
            cwd: firstWorkspacePath,
        });
        terminal.sendText(command);
        terminal.show();
    }
}

export function deactivate() {}
