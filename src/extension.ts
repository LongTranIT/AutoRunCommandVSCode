import * as vscode from "vscode";
import { dataFilePath, getData, isPathValid, runCommand } from "./until";
const fs = require("fs");
const data = getData();

export function activate(context: vscode.ExtensionContext) {
    const config = vscode.workspace.getConfiguration();
    const reloadTimeWhenReloadByCode = config.get("reloadTime", 30);
    const showReloadTimeInNotification = config.get(
        "showReloadTimeInNotification",
        false
    );
    // Calculate distance time when reload
    const closeTimeFromStore = data?.closeTime ?? "";
    const closeTime = new Date(closeTimeFromStore).getTime();
    const openTime = new Date().getTime();
    const distanceTime = Math.abs((openTime - closeTime) / 1000);

    if (showReloadTimeInNotification) {
        vscode.window.showInformationMessage(`Reload time: ${distanceTime}s`);
    }
    // Don't re-run extension when reload by VSCode
    if (distanceTime < reloadTimeWhenReloadByCode) {
        return;
    }
    //Run extension
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

export function deactivate() {
    // Save data to store
    data.closeTime = new Date();
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}
