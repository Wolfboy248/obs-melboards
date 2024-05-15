if (-not (Test-Path "C:\Program Files\nodejs\node.exe")) {
    Write-Host "Node.js is not installed, which is required for the server to run."

    $install = Read-Host "Would you like to install Node.js? (y/n)"
    if ($install -eq "y" -or $install -eq "Y") {
        Clear-Host
        Write-Host "Installing Node.js..." -ForegroundColor Green

        $url = "https://nodejs.org/dist/latest/node-v22.1.0-x64.msi"
        $output = "node_installer.msi"
        Invoke-WebRequest -Uri $url -OutFile $output

        Start-Process msiexec -ArgumentList "/i $output /quiet" -Wait

        # Check if installation was successful
        if ($LastExitCode -eq 0) {
            Write-Host "Node.js has been installed successfully."
        } else {
            Write-Host "Failed to install Node.js."
        }

        # Clean up installer
        Remove-Item $output
    } else {
        Write-Host "Installation cancelled by user"
        Pause
    }
} else {
    Write-Host "Node.js is already installed."
}

if (-not (Test-Path "node_modules")) {
    Write-Host "Installing project dependencies..."
    npm i
} else {
    Write-Host "Project dependencies already installed."
}

Start-Process "http://localhost:3000/setup"
Start-Process node -ArgumentList "server.js" -WindowStyle Minimized
