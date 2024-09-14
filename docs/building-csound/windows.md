---
sidebar_position: 3
---

# Windows 

This guide will walk you through the steps to build Csound on Windows. This was tested on on Surface Laptop Go 2 with Core i5 processor. Many of the steps will be performed on the command-line, so you will need to be comfortable with using the terminal.

## Installing Tools and Dependencies

The Csound repository contains a [BUILD.MD](https://github.com/csound/csound/blob/develop/BUILD.md) file with instructions on how to build Csound on various platforms. For this workshop, will be following the "Windows (Visual Studio/vcpkg)" instructions. Our goal for the workshop is to be able to:

1. Build Csound from source and install it to our systems
2. Be comfortable trying out various branches (including pull requests) to test out new features or bug fixes. 

To get our build tools setup, we will need to:

1. Install the chocolatey nuget package manager.
2. Install compilers, build tools, and libraries.
3. Install Visual Studio. 

After installing the above, you should have the following tools installed:

* Compiler, linker, and other C/C++ tools
* Compiler generation tools: Flex (for building lexers) and Bison (for building parsers)
* CMake, for generating build files (e.g., Makefiles, Ninja build files, XCode projects)
* Library dependencies (e.g., libsndfile, liblo, libportaudio, libportmidi) 

## Downloading the Source

The Csound source code is hosted on GitHub. You can download the source code by opening up "Git Bash" or Powershell and clone the repository with the following command:

```bash
git clone https://github.com/csound/csound.git
```

This will create a new directory called `csound` in your current working directory. By default, the `git clone` command will clone the `develop` branch.


## Building and Installing on Command-Line

We'll run through the instructions for Windows build following the instructions from [Build.md](https://github.com/csound/csound/blob/develop/BUILD.md#windows-visual-studio--vcpkg). 

The instructions run through configuring cmake to generate a Visual Studio project and using the commandline to build the project.

:::note

When running choco to install tools, you will need to do this using an adminstrator console. You can do this by hitting the Windows key, searching for "Powershell", then selecting "Run as Administrator".

![Powershell Administrator](/img/powershell_admin.png)

:::

### Test the Build

If you would like to test the build, you can define OPCODE7DIR64 to point to the build directory. Following the instructions of the above, you will be in the root of the csound source code. The build produces artifacts (i.e., csound.exe, libcsound64.dll, etc.) in the build/Release folder. Change directories to the build/Release folder and use the following to temporarily set OPCODE7DIR64 for your powershell session:

```powershell
$env:OPCODE7DIR64=$pwd
```

or replace $pwd with a full path.

After setting the environment variable, you can run the `csound` executable by typing `.\csound.exe`. You should see Csound's standard help message. You might then try running Dr. Boulanger's "Trapped in Convert"  by running:

```powershell
.\csound.exe -o dac ..\..\examples\trapped.csd
```

Using the above to set OPCODE7DIR64 to the build folder is useful for testing the build, especially if you maintain multiple copies of Csound on your system. For example, I will often have one copy of Csound that I use for building and installing to my system; one copy of csound that I use for my own development work; and another for testing out other people's branches or pull requests. 

We also test Csound using various suites of automated tests:

* commandline tests: These are a suite of CSD files that test various aspects of Csound's functionality. You can run these tests by typing `make csdtests` in the build directory.
* regression tests: These are a secondary suite of CSD files that  various aspects of Csound's functionality. You can run these tests by typing `make regression` in the build directory.
* soak tests: These are a suite of CSD files that test Csound's stability over time. You can run these tests by typing `make soak` in the build directory. These take a very long time to generate wav files which are used for comparison in future runs. 
* Unit Tests: These are a suite of tests that test individual functions of Csound. You can run these tests by typing `make test` in the build directory. If you are unable to run `make test`, it may be due to not having build the tests. These require having the gtest library installed as well as configuring the build using `-DBUILD_STATIC_LIBRARY=ON`.

### Installing Csound

If you are satisfied with the build, you can configure your build folder to "install" Csound to your system. (There may be better ways to do this, but this is the way I have been doing it.)

1. Hit the windows key and type "env" and choose "Edit the System Environment Variables".  

![Edit System Environment Variables](/img/edit_system_env_vars.png)

2. Hit the Environment Variables button to open up the Environment Variables dialog

![Environment Variables](/img/env_vars.png)

Here you will add one entry for OPCODE7DIR64 using the path of the build/Release folder, as well as add an entry to the PATH variable for the same folder. (You can choose to set these for just your User or for the entire System.)

When double-clicking on the value part of the system var to edit for PATH, it may open another dialog where you can add an entry for your path.

![Edit Environment Variable](/img/edit_system_var.png)

Once complete, you can verify that your build of Csound is available on your system by opening a new powershell and typing "csound". You should see the help information for Csound and this should mean that you can now run Csound from anywhere on your computer. 

## Building and Developing with Visual Studio 

One of the artifacts of following the build instructions for command-line is that cmake will generate a Visual Studio Solution project for Csound called Csound.sln in the build folder. If you double-click this or open Visual Studio 2022 and navigate to open the .sln, you will have a project open that you can use to develop, build, debug, and profile Csound.

![Visual Studio](/img/visual_studio.png)

In the solution explorer you will see all of the build targets defined in our CMake project, as well as a special ALL_BUILD target. In the screenshot you will see that in the dropdown I have set the build to Debug, which will build artifacts to the build/Debug folder. 

To get started, first thing to do is build the ALL_BUILD target. You can do so by right-clicking the ALL_BUILD target in the solution explorer and choosing the "Build" menu option. An output window will appear that shows the progress of building all of the Csound targets and, if all goes well, the end of your build output should show something like this:

```
42>------ Build started: Project: ALL_BUILD, Configuration: Debug x64 ------
========== Build: 42 succeeded, 0 failed, 1 up-to-date, 0 skipped ==========
========== Build completed at 6:36 PM and took 03:53.609 minutes ========
```

## Running Csound in Visual Studio 

To run Csound in Visual Studio, right click the "csound-bin" target in the Solution Explorer and first choose "Set as Startup Project". This should make the target bold in the explorer and this target will be used when we hit the debug button.

Next, we will configure the target's debug settings. Right click the target once again and choose "Properties". You should see a dialog appear like below:

![Target Properties](/img/vs_target_properties.png)

You will want to edit the "Command Arguments" as well as "Environment". For example, I have:

```
-odac C:\Users\kunst\work\csound\csound\examples\trapped.csd
```

for the command arguments and:

```
OPCODE7DIR64=C:\Users\kunst\work\csound\csound\build\Debug
```

for the environment. You will need to update for paths appropriate to your system.

Once these are configured, you can hit the green play button next to the "Local Windows Debugger" in the top toolbar to start debugging Csound. You should see a command prompt open up with csound running Dr. B's "Trapped in Convert".

At this point, you're ready to start exploring the codebase. We'll discuss setting breakpoints and debugging further in the next part of the workshop.



