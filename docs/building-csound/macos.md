---
sidebar_position: 2
---

# macOS 

This guide will walk you through the steps to build Csound on macOS. This was tested on macOS 14.2.1 (Sonoma) on a Macbook Pro with an M3 Pro chip. Many of the steps will be performed on the command-line, so you will need to be comfortable with using the terminal.

## Downloading the Source

The Csound source code is hosted on GitHub. You can download the source code by cloning the repository with the following command:

```bash
git clone https://github.com/csound/csound.git
```

This will create a new directory called `csound` in your current working directory. By default, the `git clone` command will clone the `develop` branch.

## Installing Tools and Dependencies

The Csound repository contains a [BUILD.MD](https://github.com/csound/csound/blob/develop/BUILD.md) file with instructions on how to build Csound on various platforms. For this workshop, will be following the "Building Csound using Homebrew-supplied dependencies" instructions. Our goal for the workshop is to be able to:

1. Build Csound from source and install it to our systems
2. Be comfortable trying out various branches (including pull requests) to test out new features or bug fixes. 

To get our build tools setup, we will need to:

1. Install XCode and XCode Command Line Tools from the App Store.
2. Install Homebrew from [brew.sh](https://brew.sh). 
3. Install the dependencies for Csound using Homebrew. 

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
* Unix Makefiles               = Generates standard UNIX makefiles.
  Ninja                        = Generates build.ninja files.
  Ninja Multi-Config           = Generates build-<Config>.ninja files.
  Watcom WMake                 = Generates Watcom WMake makefiles.
  Xcode                        = Generate Xcode project files.
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

At this point, you may encounter an error message that says that a required library is missing. If you do, you will need to install the missing library using Homebrew. For example, if you are missing the `libsndfile` library, you can install it by running `brew install libsndfile`. After installing any missing libraries, you can run `cmake ..` again. 

By default, Csound will try to build everything that it can. You can configure build options by passing arguments to the cmake command. For example, you can disable using CURL by passing `-DUSE_CURL=OFF` to the cmake command. 

You can view a list of available build options by running `ccmake ..` in the build directory. This will open a curses-based interface that will allow you to configure the build options. 

### Building Csound and Plugins

4. Run `make` to build Csound. This will compile the source code and generate the necessary binaries. If all has gone well, you will see a success message at the end of the build process. You can view what was built by typing `ls`. You should see a list of files, including the `csound` executable, utilities like `dnoise` and `cvanal`, as well as a number of .dylib dynamic library files. These .dylibs are the plugins for csound that include opcodes and other functionality.

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


## Building and Developing with XCode

To build Csound using XCode, create a directory in which to create the XCode project. For example, you might make a `build-xcode` directory in the root of the Csound source code. If using this folder, you would type the following to configure with CMake to generate an XCode project:

```bash
cmake -G Xcode ..
```

This will generate an XCode project in the `build-xcode` directory. You can open this project in XCode by typing `open Csound.xcodeproj`, or double-clicking the .xcodeproj in the Finder, or opening XCode and selecting the project.

Once in XCode, you can click the top bar to select different targets (called *Schemes* in Xcode parlance) to build:

![XCode Targets](/img/xcode_targets.png)

Each target corresponds to executable and libarary targets that you can similarly build with make. For example, `csound-bin` is the target used for main csound executable. 

In general, you'll usually run the `ALL_BUILD` target at least once to build all the targets. By default, all built targets will be placed in the `build-xcode/Debug` folder as the default CMAKE_BUILD_TYPE is Debug. You will need to know this path for setting OPCODE7DIR64 when developing and testing. 

## Running Csound in XCode

To run the csound commandline, select the `csound-bin` targe. Configure the run settings for this target by going to the dropdown menu for Schemes and choose `Edit Scheme`, or use `cmd-shift-,` to open the scheme editor.

![XCode Scheme Editor](/img/xcode_scheme_editor.png)

Here you will set commandline arguments to pass to csoound as well as set environment variables (i.e., OPCODE7DIR64). You can use the checkbox to enable and disable arguments and variables, which is handy when having to switch between different files regularly.





