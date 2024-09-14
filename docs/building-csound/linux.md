---
sidebar_position: 4
---

# Linux 

This guide will walk you through the steps to build Csound on Linux. This was tested on Ubuntu 22.04 on Surface Laptop Go 2 with Core i5 processor. Many of the steps will be performed on the command-line, so you will need to be comfortable with using the terminal.

## Downloading the Source

The Csound source code is hosted on GitHub. You can download the source code by cloning the repository with the following command:

```bash
git clone https://github.com/csound/csound.git
```

This will create a new directory called `csound` in your current working directory. By default, the `git clone` command will clone the `develop` branch.

## Installing Tools and Dependencies

The Csound repository contains a [BUILD.MD](https://github.com/csound/csound/blob/develop/BUILD.md) file with instructions on how to build Csound on various platforms. For this workshop, will be following the "Ubuntu Linux" instructions. Our goal for the workshop is to be able to:

1. Build Csound from source and install it to our systems
2. Be comfortable trying out various branches (including pull requests) to test out new features or bug fixes. 

To get our build tools setup, we will need to:

1. Install compilers, build tools, and libraries.
2. Install VS Code editor. 

After installing the above, you should have the following tools installed:

* Compiler, linker, and other C/C++ tools
* Compiler generation tools: Flex (for building lexers) and Bison (for building parsers)
* CMake, for generating build files (e.g., Makefiles, Ninja build files, XCode projects)
* Library dependencies (e.g., libsndfile, liblo, libportaudio, libportmidi) 

## Building and Installing on Command-Line


### Configuring the Build

We'll first build Csound from the command-line. Follow these steps:

1. Change into the root of the csound folder 
2. Creating a build directory by typing `mkdir build` and changing into it by typing `cd build`
3. Run the following command to generate the build files: `cmake ..`. This will run cmake, which will interrogate your system and generate the necessary build files. By default, cmake will generate Makefiles. If you want to generate a different type of build file (e.g., Ninja, XCode), you can specify the generator by running `cmake -G <generator> ..`. You can view a list of available generators by running `cmake --help`. You should see output similar to the following:

```bash

Generators

The following generators are available on this platform (* marks default):
  Green Hills MULTI            = Generates Green Hills MULTI files
                                 (experimental, work-in-progress).
* Unix Makefiles               = Generates standard UNIX makefiles.
  Ninja                        = Generates build.ninja files.
  Ninja Multi-Config           = Generates build-<Config>.ninja files.
  Watcom WMake                 = Generates Watcom WMake makefiles.
  CodeBlocks - Ninja           = Generates CodeBlocks project files
                                 (deprecated).
  CodeBlocks - Unix Makefiles  = Generates CodeBlocks project files
                                 (deprecated).
  CodeLite - Ninja             = Generates CodeLite project files
                                 (deprecated).
  CodeLite - Unix Makefiles    = Generates CodeLite project files
                                 (deprecated).
  Eclipse CDT4 - Ninja         = Generates Eclipse CDT 4.0 project files
                                 (deprecated).
  Eclipse CDT4 - Unix Makefiles= Generates Eclipse CDT 4.0 project files
                                 (deprecated).
  Kate - Ninja                 = Generates Kate project files (deprecated).
  Kate - Ninja Multi-Config    = Generates Kate project files (deprecated).
  Kate - Unix Makefiles        = Generates Kate project files (deprecated).
  Sublime Text 2 - Ninja       = Generates Sublime Text 2 project files
                                 (deprecated).
  Sublime Text 2 - Unix Makefiles
                               = Generates Sublime Text 2 project files
                                 (deprecated).
```

For now, we will use the default generator, which is Unix Makefiles.

At this point, you may encounter an error message that says that a required library is missing. If you do, you will need to install the missing library using Homebrew. For example, if you are missing the `libsndfile` library, you can install it by running `sudo apt install libsndfile1-dev`. After installing any missing libraries, you can run `cmake ..` again. 

By default, Csound will try to build everything that it can. You can configure build options by passing arguments to the cmake command. For example, you can disable using CURL by passing `-DUSE_CURL=OFF` to the cmake command. 

You can view a list of available build options by running `ccmake ..` in the build directory. This will open a curses-based interface that will allow you to configure the build options. 

### Building Csound and Plugins

4. Run `make` to build Csound. This will compile the source code and generate the necessary binaries. If all has gone well, you will see a success message at the end of the build process. You can view what was built by typing `ls`. You should see a list of files, including the `csound` executable, utilities like `dnoise` and `cvanal`, as well as a number of .so dynamic library files. These .so are the plugins for csound that include opcodes and other functionality.

### Test the Build

5. If you would like to test the build, you can define OPCODE7DIR64 to point to the build directory. If you are still in the build directory, you can type the following to set that environment variable:

```bash
export OPCODE7DIR64=$PWD
```

After setting the environment variable, you can run the `csound` executable by typing `./csound`. You should see Csound's standard help message. You might then try running Dr. Boulanger's "Trapped in Convert"  by running:

```bash
./csound -o dac ../examples/trapped.csd
```

Using the above to set OPCODE7DIR64 to the build folder is useful for testing the build, especially if you maintain multiple copies of Csound on your system. For example, I will often have one copy of Csound that I use for building and installing to my system; one copy of csound that I use for my own development work; and another for testing out other people's branches or pull requests. 

We also test Csound using various suites of automated tests:

* commandline tests: These are a suite of CSD files that test various aspects of Csound's functionality. You can run these tests by typing `make csdtests` in the build directory.
* regression tests: These are a secondary suite of CSD files that  various aspects of Csound's functionality. You can run these tests by typing `make regression` in the build directory.
* soak tests: These are a suite of CSD files that test Csound's stability over time. You can run these tests by typing `make soak` in the build directory. These take a very long time to generate wav files which are used for comparison in future runs. 
* Unit Tests: These are a suite of tests that test individual functions of Csound. You can run these tests by typing `make test` in the build directory. If you are unable to run `make test`, it may be due to not having build the tests. These require having the gtest library installed as well as configuring the build using `-DBUILD_STATIC_LIBRARY=ON`.

### Installing Csound

6. If you are satisfied with the build, you can install Csound to your system by typing `sudo make install`. This will copy the `csound` executable and the plugins to the appropriate directories on your system. Once installed, assuming you have `/usr/local/bin` in your PATH environment variable, you will be able to run `csound` from the command-line without needing to specify the path to the executable. 

:::note

You may also want to build a Release build of csound. You can do this by specifying the build type when running cmake. For example, you can run `cmake -DCMAKE_BUILD_TYPE=Release ..` to build a release build of Csound.

:::


## Building and Developing with Visual Studio Code

To build Csound using Visual Studio Code, open up VS Code and open up the csound root folder. At this point, we will need to install a number of Extensions to proceed. Open up the extensions sidebar (ctrl-shift-x) and proceed to search the Marketplace for the following extensions:

* C/C++ by Microsoft
* CMake by twxs
* CMake Tools by Microsoft
* Csound by kunstmusik
* GitLens by GitKraken

There are many different extensions available in the Marketplace that can help simplify the coding experience (e.g., AI assistants, code formatters, Vim keybindings, etc.). The above will be the core ones we will need for this workshop.

Once the above is installed, you should see the user interface updated with new status bar controls. If you open up the command palette (ctrl-shift-p) you should also see new commands added. (For example, try opening up the command palette and type in 'cmake' and you should see a number of commands.)

Like the commandline, we will need to run cmake's configure as well as run the build command. We can do this using the "CMake: Configure" command in the palette, but we can also use the CMake Sidebar. 

The CMake sidebar provides a very nice view of all of the targets that are a part of the project. Each target shows what source code files are used as part of that target and can be easier to navigate than having to read through the various CMakeFiles.txt to understand what files exactly are used for what executables and plugins. 

:::note

I myself use [Cursor](https://cursor.com), an editor based on VS Code that has a large number AI-assistance features built into it. If you're familiar with VS Code already, and have not looked at Cursor, I recommend checking it out during this workshop. It is compatible with VS Code extensions and has a number of features that can help you write code faster and with fewer errors.

:::

## Running Csound in VS Code 

For running Csound in VS Code, I tend to do a mix of using the commandline to do full builds and quick run tests, while using VS Code's "Run and Debug" sidebar to debug using VS Code. 

![Run and Debug - Initial State](/img/vscode_run_debug_initial.png)

To use "Run and Debug", open up the sidebar. The targets and configuration for run and debug are contained in .vscode/launch.json. If you have not created a file before, your Run and Debug sidebar will look like above.

To create a new launch.json and to define a new target for running trapped.csd, first select the "create  a launch.json file" link. VS Code will create a file at .vscode/launch.json with an initial, mostly empty file, as shown below:


![Run and Debug - Initial launch.json](/img/vscode_run_debug_empty_launch_json.png)

Next, use the blue "Add configuration..." button and choose "C/C++: (gdb) Launch". A template command should be created for you that you can then edit. For example, try the following:


```
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Trapped",
            "type": "cppdbg",
            "request": "launch",
            "program": "${workspaceFolder}/build/csound",
            "args": ["-odac", "/home/steven/work/csound/cs7/examples/trapped.csd"],
            "stopAtEntry": false,
            "cwd": "${workspaceFolder}",
            "environment": [{ "name": "OPCODE7DIR64", "value": "${workspaceFolder}/build"}],
            "externalConsole": false,
            "MIMode": "gdb",
            "setupCommands": [
                {
                    "description": "Enable pretty-printing for gdb",
                    "text": "-enable-pretty-printing",
                    "ignoreFailures": true
                },
                {
                    "description": "Set Disassembly Flavor to Intel",
                    "text": "-gdb-set disassembly-flavor intel",
                    "ignoreFailures": true
                }
            ]
        }


    ]
}
```


The relevant fields to update are "name", "program", "environment", and "args". Once you have the above in your file, save it. The Run and Debug sidebar should now have a "Trapped" target that you can select to run and debug csound with gdb. 

![Run and Debug - Main](/img/vscode_run_debug_main.png)

Select the Play button to run and hopefully you will now hear Dr. B's Trapped in Convert. 

We'll discuss setting breakpoints and debugging further in the next part of the workshop.



