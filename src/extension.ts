import * as vscode from "vscode";
const fs = require("fs");

function isPathValid(path: string): boolean {
    try {
        // Check if file or directory exists
        fs.accessSync(path, fs.constants.F_OK);
        return true; // Valid path
    } catch (err) {
        return false; // Invalid path
    }
}
const runCommand = async (command: string, path: string) => {
    const terminals = vscode.window.terminals;
    const existingTerminal = terminals.find(
        (terminalItem) => terminalItem.name === "Auto command"
    );
    if (existingTerminal) {
        existingTerminal.sendText(command);
        existingTerminal.show();
    } else {
        const terminal = vscode.window.createTerminal({
            name: "Auto command",
            cwd: path,
        });
        terminal.sendText(command);
        terminal.show();
    }
};
export function activate(context: vscode.ExtensionContext) {
    const config = vscode.workspace.getConfiguration();
    const command = config.get("command", "npm start");
    const projectPath = config.get("projectPath", "");
    const isAddProjectToWorkSpace = config.get("addProject", "");
    const workspaceFolders = vscode.workspace.workspaceFolders;

    if (isPathValid(projectPath)) {
        runCommand(command, projectPath);
        //Check setting: Add project path to workspace
        if (isAddProjectToWorkSpace) {
            vscode.workspace.updateWorkspaceFolders(
                vscode.workspace.workspaceFolders
                    ? vscode.workspace.workspaceFolders.length
                    : 0,
                null,
                { uri: vscode.Uri.file(projectPath) }
            );
        }
    } else if (workspaceFolders?.length) {
        //Run command at first project
        const firstProjectInWorkspace = workspaceFolders[0].uri.fsPath;
        runCommand(command, firstProjectInWorkspace);
    }
}

export function deactivate() {}
