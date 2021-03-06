# Website
My landingpage, programmed from scratch

## About this Project
This website was intentionally programmed for no purpose. It was a boredom project during a lecture I had some time ago. It is nothing special, but I thought it would be pretty neat to have an own landing page for applications and references.

## Installation Guide

### 0. Requirements
1. FontAwesome v5.15 (cdn or local version)
2. Any environment (LAMP stack, ...)
3. Python ``cssmin`` module
```bash
pip install cssmin
```
4. ``uglify.js`` npm package
```bash
npm install uglify-js -g
```

### 1. Download Repository
You can do this by multiple ways. When using the desktop application, you can just give it the repository url and download it. For terminal-based systems, you will need to do it with the `git` command.

```bash
git clone https://github.com/david-prv/discord-bot.git <target-dir>
```

### 2. Move it to Html Directory
In case you downloaded it to any internal directories, like ``/home``, you will need to move the project to your html folder. This is used to be located at ``/var/www/html``. In case you are using any shared host or a windows-based system contact your host or do some research. Assuming, that you are using the recommended LAMP environment, you can use the following command to move the downloaded files:
```bash
sudo mv <git-dir> <html-dir> && cd <html-dir>
```
And that's pretty much it.

### 3. Adjustments
You now should adjust the relative paths, if needed. Also, you now can adjust styles and scripts.

### 4. Run compressor
Now it's time to run the compressor script:
```bash
cd [working-dir] && ./compressor.sh
```

### 5. You are done
Don't forget to put credits somewhere, in case you want to use this site. Also, you need to keep already existing the credits.

## Credits

I used a background animation, made by [Alison Quaglia](https://codepen.io/hylobates-lar).

----------------------------

Written by [David Dewes](https://david-dewes.de)
