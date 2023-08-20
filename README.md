# Auto Run Command Extension for Visual Studio Code

This Visual Studio Code (VSCode) extension provides the following functionality:

-   Automatically runs a specified command when VSCode is opened.
-   Allows you to configure the command to run via VSCode settings.
-   Allows you to specify a project path via VSCode settings, and the configured command will be executed within that project path.
-   If no project path is configured, the extension will run the command within the first project/workspace it finds.
-   Provides the ability to add project paths to your workspace for easy access.

## Features

### Auto Run Command

Upon opening VSCode, this extension will automatically execute a command as configured in the VSCode settings. This can be useful for tasks like starting a development server or running a specific script.

### Command Configuration

You can customize the command to run by editing your VSCode settings. To do this:

1. Open VSCode settings (File > Preferences > Settings).
2. Search for the extension's settings by typing "Auto Run Command" in the search bar.
3. Configure the desired command to run.

### Project Path Configuration

This extension allows you to specify a project path in your VSCode settings. The configured command will be executed within this project path. To set a project path:

1. Open VSCode settings (File > Preferences > Settings).
2. Search for the extension's settings by typing "Auto Run Command" in the search bar.
3. Enter the desired project path.

If no project path is configured, the extension will automatically run the command within the first project or workspace it finds.

### Add Project Path to Workspace

You can add project paths to your workspace for easy access. This can be helpful when you have multiple projects and want to quickly switch between them. To add a project path:

1. Open your workspace.
2. Click on the "Auto Run Command" icon in the VSCode sidebar.
3. Use the "Add Project Path" option to include the desired project path in your workspace.

## Usage

1. Install the extension from the VSCode Marketplace.
2. Configure the command to run and, optionally, the project path in your VSCode settings.
3. Open VSCode, and the command will be automatically executed.

Enjoy the convenience of automating tasks and managing your projects with the Auto Run Command extension for Visual Studio Code!

## License

This extension is licensed under the [PTN Global](LongTranIT).
