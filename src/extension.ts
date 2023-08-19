import { cwd } from "process";
import * as vscode from "vscode";
export function activate(context: vscode.ExtensionContext) {
    const config = vscode.workspace.getConfiguration("extensionSettings");
    const enableFeature = config.get("enableFeature", false);
    console.log("enableFeature:", enableFeature);

    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders?.length) {
        // const firstWorkspacePath = workspaceFolders[0].uri.fsPath;
        // const terminal = vscode.window.createTerminal({
        //     name: "npm-start",
        //     cwd: firstWorkspacePath,
        // });
        // terminal.sendText("npm start");
        // terminal.show();
    }
    vscode.workspace.onDidChangeConfiguration((event) => {
        console.log("Settings have changed:", event);
        // Thực hiện hành động phù hợp khi cài đặt thay đổi
    });
}

export function deactivate() {}
