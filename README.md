# KAS Canvas
> JS files in `/js` are loaded through a canvas lms template.

## Cli
The `canvas.py` file is a CLI which lets you export canvas assignments to a CSV file.

### Usage
There are two ways to get the cli working:
  1. Quickly set up on Repl.it
  2. Manually install

#### Repl.it
You can use it by clicking the badge below to open a repl.it: 
[![Run on Repl.it](https://repl.it/badge/github/kingalfred/canvas)](https://repl.it/github/kingalfred/canvas)

#### Manual installation
Clone the repo, install dependencies using pip, then run the cli.
(this assumes you have pip installed)
```bash
$ git clone https://github.com/kingalfred/canvas
$ cd canvas
$ python -m pip install docopt tqdm
$ python canvas.py --help
```