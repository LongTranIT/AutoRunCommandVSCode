import * as vscode from "vscode";
const fs = require("fs");
const path = require("path");
const extensionId = "LongTranIT.autoruncommand"; //{publisher}.{name}

const extensionPath =
    vscode.extensions.getExtension(extensionId)?.extensionPath;
export const dataFilePath = path.join(extensionPath, "data.json");

export const getData = () => {
    const extensionPath =
        vscode.extensions.getExtension(extensionId)?.extensionPath;
    const dataFilePath = path.join(extensionPath, "data.json");
    // Read data from store
    const rawData = fs.readFileSync(dataFilePath);
    const data = JSON.parse(rawData);
    return data;
};

export const runCommand = async (command: string, path: string) => {
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

export const isPathValid = (path: string) => {
    try {
        // Check if file or directory exists
        fs.accessSync(path, fs.constants.F_OK);
        return true; // Valid path
    } catch (err) {
        return false; // Invalid path
    }
};
