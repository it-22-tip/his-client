'use-strict'
// import { execFile, spawn } from 'child_process'
import { spawn } from 'child_process'
import { default as Promise } from 'bluebird'
import crypto from 'crypto'
import fs from 'fs'
import path from 'path'
// import util from 'util'
// import forOwn from 'lodash'
const TMPDIR = `/home/it1/.hisdata/tmp`// `./node-pdftk-tmp/`

// the officially support options of prince(1)
/* let princeOptions = {
  'help': false,
  'version': false,
  'credits': false,
  'verbose': false,
  'log': true,
  'input': true,
  'input-list': true,
  'baseurl': true,
  'fileroot': true,
  'no-xinclude': false,
  'no-network': false,
  'http-user': true,
  'http-password': true,
  'http-proxy': true,
  'http-timeout': true,
  'cookiejar': true,
  'ssl-cacert': true,
  'ssl-capath': true,
  'insecure': false,
  'javascript': false,
  'script': true,
  'style': true,
  'media': true,
  'no-author-style': false,
  'no-default-style': false,
  'output': true,
  'profile': true,
  'attach': true,
  'no-embed-fonts': false,
  'no-subset-fonts': false,
  'no-compress': false,
  'pdf-title': true,
  'pdf-subject': true,
  'pdf-author': true,
  'pdf-keywords': true,
  'pdf-creator': true,
  'encrypt': false,
  'key-bits': true,
  'user-password': true,
  'owner-password': true,
  'disallow-print': false,
  'disallow-copy': false,
  'disallow-annotate': false,
  'disallow-modify': false,
  'scanfonts': false
} */

/*  API constructor  */
class PrinceXML {
  constructor (options, tmpFiles) {
    /*  optionally on-the-fly generate an instance  */
    /* if (!(this instanceof PrinceXML)) {
      return new PrinceXML(options)
    } */

    /*  create default configuration  */
    this.config = {
      binary: 'prince',
      prefix: '',
      license: '',
      timeout: 10 * 1000,
      maxbuffer: 10 * 1024 * 1024,
      cwd: '.',
      option: {},
      inputs: [],
      cookies: [],
      output: ''
    }

    this.tmpFiles = tmpFiles || []

    /**
     * @member
     * @type {String}
     */
    this.command = 'prince'

    // override defaults with more reasonable information about environment
    /* let install = [
      {
        basedir: 'prince/lib/prince',
        binary: 'bin/prince'
      },
      {
        basedir: 'prince\\program files\\Prince\\Engine',
        binary: 'bin\\PrinceXML.exe'
      }
    ]
    let basedir
    let binary
    for (let i = 0; i < install.length; i++) {
      basedir = path.resolve(path.join(__dirname, install[i].basedir))
      binary = path.join(basedir, install[i].binary)
      if (fs.existsSync(binary)) {
        this.binary(binary)
        this.prefix(basedir)
        break
      }
    } */

    // allow caller to override defaults
    if (typeof options === 'object') {
      if (typeof options.binary !== 'undefined') {
        this.binary(options.binary)
      }
      if (typeof options.prefix !== 'undefined') {
        this.prefix(options.prefix)
      }
      if (typeof options.inputs !== 'undefined') {
        this.inputs(options.inputs)
      }
      if (typeof options.cookies !== 'undefined') {
        this.cookies(options.cookies)
      }
      if (typeof options.output !== 'undefined') {
        this.output(options.output)
      }
    }

    return this
  }

  static input (src) {
    const input = []
    const tmpFiles = []

    /**
     * Write a temp file and save the path for deletion later.
     * @private
     * @function
     * @param {Object} srcFile - Buffer to be written as a temp file.
     * @returns {String} Path of the newly created temp file.
     */
    function writeTempFile (srcFile) {
      const tmpPath = path.join(__dirname, TMPDIR)
      const uniqueId = crypto.randomBytes(16).toString('hex')
      const tmpFile = `${tmpPath}${uniqueId}.pdf`
      fs.writeFileSync(tmpFile, srcFile)
      tmpFiles.push(tmpFile)
      return tmpFile
    }

    src = Array.isArray(src) ? src : [
      src
    ]

    for (const srcFile of src) {
      if (Buffer.isBuffer(srcFile)) {
        input.push(writeTempFile(srcFile))
      } else if (PrinceXML.isObject(srcFile)) {
        for (const handle in srcFile) {
          if (srcFile.hasOwnProperty(handle)) {
            if (Buffer.isBuffer(srcFile[handle])) {
              input.push(`${handle}=${writeTempFile(srcFile[handle])}`)
            } else if (!fs.existsSync(srcFile[handle])) {
              throw new Error(`The input file "${srcFile[handle]}" does not exist`)
            } else {
              input.push(`${handle}=${srcFile[handle]}`)
            }
          }
        }
      } else {
        if (!fs.existsSync(srcFile)) throw new Error(`The input file "${srcFile}" does not exist`)
        input.push(srcFile)
      }
    }

    return new PrinceXML(input, tmpFiles)
  }

  static output (writeFile, outputDest, needsOutput = true) {
    return new Promise((resolve, reject) => {
      if (needsOutput) {
        this.args.push(
          'output',
          outputDest || '-'
        )
      }

      this.args = this.args.concat(this.postArgs)

      const child = spawn(this.command, this.args)

      const result = []

      child.stderr.on('data', data => {
        if (!(this._ignoreWarnings && data.toString().toLowerCase().includes('warning'))) {
          return reject(data)
        }
      })

      child.stdout.on('data', data => result.push(Buffer.from(data)))

      child.on('close', code => {
        this._cleanUpTempFiles()

        if (code === 0) {
          const output = Buffer.concat(result)
          if (writeFile) {
            return fs.writeFile(writeFile, output, err => {
              if (err) return reject(err)
              return resolve(output)
            })
          }
          return resolve(output)
        }
        return reject(code)
      })

      if (this.stdin) {
        child.stdin.write(this.stdin)
        child.stdin.end()
      }
    })
  }
}

/*
// set path to CLI binary
PrinceXML.prototype.binary = function (binary) {
  if (arguments.length !== 1) {
    throw new Error('Prince#binary: invalid number of arguments')
  }
  this.config.binary = binary
  this.config.prefix = ''

  return this
} */

/*
// set path to installation tree
PrinceXML.prototype.prefix = function (prefix) {
  if (arguments.length !== 1) {
    throw new Error('Prince#prefix: invalid number of arguments')
  }
  this.config.prefix = prefix
  return this
} */

/*
// set path to license file
PrinceXML.prototype.license = function (filename) {
  if (arguments.length !== 1) {
    throw new Error('Prince#license: invalid number of arguments')
  }
  this.config.license = filename
  return this
} */

/*
// set timeout for CLI execution
PrinceXML.prototype.timeout = function (timeout) {
  if (arguments.length !== 1) {
    throw new Error('Prince#timeout: invalid number of arguments')
  }
  this.config.timeout = timeout
  return this
} */

/*
// set maxmimum stdout/stderr buffer for CLI execution
PrinceXML.prototype.maxbuffer = function (maxbuffer) {
  if (arguments.length !== 1) {
    throw new Error('Prince#maxbuffer: invalid number of arguments')
  }
  this.config.maxbuffer = maxbuffer
  return this
} */

/*
// set current working directory for CLI execution
PrinceXML.prototype.cwd = function (cwd) {
  if (arguments.length !== 1) {
    throw new Error('Prince#cwd: invalid number of arguments')
  }
  this.config.cwd = cwd
  return this
} */

/*
// set input file(s)
PrinceXML.prototype.inputs = function (inputs) {
  if (arguments.length !== 1) {
    throw new Error('Prince#inputs: invalid number of arguments')
  }
  this.config.inputs = Array.isArray(inputs) ? inputs : [ inputs ]
  return this
} */

/*
// set cookie(s)
PrinceXML.prototype.cookies = function (cookies) {
  if (arguments.length !== 1) {
    throw new Error('Prince#cookies: invalid number of arguments')
  }
  this.config.cookies = Array.isArray(cookies) ? cookies : [ cookies ]
  return this
} */

/*
// set output file
PrinceXML.prototype.output = function (output) {
  if (arguments.length !== 1) {
    throw new Error('Prince#output: invalid number of arguments')
  }
  this.config.output = output
  return this
} */
/*
// set CLI options
PrinceXML.prototype.option = function (name, value, forced) {
  if (arguments.length < 1 || arguments.length > 3) {
    throw new Error('Prince#option: invalid number of arguments')
  }
  if (arguments.length < 2) {
    value = true
  }
  if (arguments.length < 3) {
    forced = false
  }
  if (!forced && typeof princeOptions[name] === 'undefined') {
    throw new Error('Prince#option: invalid prince(1) option: "' + name + '" (but can be forced)')
  }
  if (!forced && princeOptions[name] === true && arguments.length === 1) {
    throw new Error('Prince#option: prince(1) option "' + name + '" required argument')
  }
  this.config.option[name] = value
  return this
} */

/*
// execute the CLI binary
PrinceXML.prototype._execute = function (method, args) {
  // determine path to prince(1) binary
  let prog = this.config.binary
  if (!fs.existsSync(prog)) {
    let findInPath = function (name) {
      let p = process.env.PATH.split(path.delimiter).map(function (item) {
        return path.join(item, name)
      })
      for (let i = 0, len = p.length; i < len; i++) {
        if (fs.existsSync(p[i])) return p[i]
      }
      return undefined
    }
    prog = findInPath(prog)
    if (typeof prog === 'undefined') {
      throw new Error('Prince#' + method + ': cannot resolve binary "' + this.config.binary + '" to a filesystem path')
    }
  }

  // return promise for executing CLI
  let self = this
  return new Promise(function (resolve, reject) {
    try {
      let options = {}
      options.timeout = self.config.timeout
      options.maxBuffer = self.config.maxbuffer
      options.cwd = self.config.cwd
      options.encoding = 'buffer'
      execFile(prog, args, options,
        function (error, stdout, stderr) {
          let m
          if (error === null && (m = stderr.toString().match(/prince:\s+error:\s+([^\n]+)/))) {
            // reject({ error: m[1], stdout: stdout, stderr: stderr })
            reject(new Error(m[1]))
          } else if (error !== null) {
            // reject({ error: error, stdout: stdout, stderr: stderr })
            reject(new Error(error))
          } else {
            resolve({ stdout: stdout, stderr: stderr })
          }
        }
      )
    } catch (exception) {
      reject(exception)
      // reject({ error: exception, stdout: '', stderr: '' })
    }
  })
} */

/*
// execute the CLI binary
PrinceXML.prototype.execute = function () {
  // determine arguments to prince(1) binary
  let args = []
  if (this.config.prefix !== '') {
    args.push('--prefix')
    args.push(this.config.prefix)
  }
  if (this.config.license !== '') {
    args.push('--license-file')
    args.push(this.config.license)
  }
  forOwn(this.config.option, function (value, name) {
    args.push('--' + name)
    if (value !== true) {
      args.push(value)
    }
  })
  this.config.inputs.forEach(function (input) {
    args.push(input)
  })

  // supported since Prince 10
  this.config.cookies.forEach(function (cookie) {
    args.push('--cookie')
    args.push(cookie)
  })

  // required from Prince 11 on, supported since Prince 7
  args.push('--output')
  args.push(this.config.output)

  // return promise for executing CLI
  return this._execute('execute', args)
} */

// export API constructor
export default PrinceXML
