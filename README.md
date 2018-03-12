# ImageCaptioner Project

## Ionic Client Setup Instructions
The client is coded using *Ionic Framework Version 3.5*. Therefore, *Ionic* needs to be installed.
To install *Ionic Framework,* one needs to install *Node.js* as well.
To install *Node.js*, on the Terminal,

```terminal
$ curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
$ sudo apt-get install -y nodejs
```

Afterwards install *Cordova* by typing on the terminal

```terminal
$ sudo apt-get install -g cordova
```

Then install *Ionic*.

```terminal
$ sudo npm install -g ionic
```

Afterwards, download and install *Android Studio* by following the instructions in *[Android Website](https://developer.android.com/studio/install.html)*

Then install *[Oracle JDK](http://www.webupd8.org/2015/02/install-oracle-java-9-in-ubuntu-linux.html)* and *[Android SDK](http://developer.android.com/sdk/index.html)*

Set your **ANDROID_HOME** and point to Sdk folder and update **PATH** by starting `gedit ~./profile` and adding these lines to the bottom:

```
export ANDROID_HOME=”$HOME/Android/Sdk”
export PATH=”$PATH:$ANDROID_HOME/tools”
export PATH=”$PATH:$ANDROID_HOME/platform-tools”
```

Afterwards go to project directory and add *Android Platform*.

```terminal
$ ionic cordova platform add android
```

Now that Ionic is installed, client can be downloaded from this repository and be built or emulated after the necessary plugins are installed. Note that normally you need to import installed modules to `src/app/app.module.ts`. However since in this project they are already present, only installing is needed.

### Installing necessary plugins

#### Camera Plugin
```terminal
$ ionic cordova plugin add cordova-plugin-camera
$ npm install --save @ionic-native/camera
```

#### File Plugin
```terminal
$ ionic cordova plugin add cordova-plugin-file
$ npm install --save @ionic-native/file
```

#### File Transfer Plugin
```terminal
$ ionic cordova plugin add cordova-plugin-file-transfer
$ npm install --save @ionic-native/file-transfer
```

#### File Path Plugin
```terminal
$ ionic cordova plugin add cordova-plugin-filepath
$ npm install --save @ionic-native/file-path
```

Finally now that everything is ready, the project can be built and/or emulated.
```terminal
$ ionic cordova build android
$ ionic cordova emulate android
```

## Node.js Server Setup Instructions
The Node.js Server is coded using *Express*. Therefore having installed *Node.js*, *Express* needs to be installed.

```terminal
$ sudo apt-get install node-express
$ sudo npm install -g express
```

Afterwards, some modules need to be installed in order for server to operate.

### Installing Necessary Node.js Modules

Since the necessary modules are present in package.json file, all of them can be installed by `npm install` command.

```terminal
$ npm install 
```

When the plugins are installed, the server can be started by going to server's directory in terminal and typing the command:
```terminal
$ node app.js
```
