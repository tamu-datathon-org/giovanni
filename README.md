# Setting up your devtools

## Warning:

- Do this when you have a good internet connection
- These will take a bunch of storage space. You won't need this much, but having 50-100GB free should be more than
  enough.

## Windows users only:

- Install [Windows Terminal](ms-windows-store://pdp/?ProductId=9N0DX20HK701)
- Install [Powershell 7](ms-windows-store://pdp/?ProductId=9mz1snwt0n5d)
    - This is different from the pre-installed version and has really nice features
- (Optional) Install [WSL](ms-windows-store://pdp/?ProductId=9p9tqf7mrm4r)
    - This lets you run Linux on Windows, which is incredibly useful
- (Optional) Install [Ubuntu](ms-windows-store://pdp/?ProductId=9pdxgncfsczv)
    - Requires WSL
- Go to your [Windows Update settings](ms-settings:windowsupdate?activationSource=SMC-IA-4027667), click "Check for
  updates," install any updates
- Restart your PC, and check for updates again. Repeat these two steps until there's nothing left.
- Open Windows Terminal
    - Go to Settings > Startup > Default Profile
        - Set it to Powershell or Powershell 7
        - Click save
        - Open a new tab
        - Wait for Powershell to load. Make sure it says "Powershell \<version number>."
            - If the version number is at least 7.0.0, you can continue
            - If the version number is lower or doesn't show up, you need to change the default profile again to a
              different Powershell
        - (Optional) Go to Settings > Defaults > turn on "Run this profile as Administrator"
            - Windows doesn't have a "sudo" command like Unix/Linux does, so this makes using the terminal more
              convenient
- With a Powershell 7 tab open, copy and run these commands:
  ```
    winget install -e --id GitHub.GitHubDesktop
    winget install -e --id Microsoft.VisualStudioCode
    winget install -e --id JetBrains.Toolbox
  ```

## Linux/WSL users only:

- Update and install your packages
    - On Ubuntu/Debian:
      ```
      sudo apt update
      sudo apt upgrade -y
      sudo reboot  
      ```

## MacOS users only:

- Please update MacOS.

## Install Git

- On Windows
   ```
     winget install -e --id Git.Git
   ```
- [Other platforms](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

## Install an IDE

You have 2 (major) options: JetBrains and VSCode.

* VSCode is very popular, has tons of plugins, and is super easy to set up and use
* JetBrains has fewer plugins and is harder to use, but has incredibly powerful tools and automation that make coding a
  lot easier
* You SHOULD use both!
    * VSCode is great for small edits and having 1 universal editor
    * JetBrains' stuff is amazing for going super deep into 1 project with a popular tech stack