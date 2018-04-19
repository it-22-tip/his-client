<template>
  <div class="printer">
    <img :src="img">
    <button @click="getSupportedJobCommands">Supported Job</button>
    <button @click="getSupportedPrintFormats">Supported Format</button>
    <button @click="getPrinters">List Printer</button>
    <button @click="print">Print</button>
    <button @click="electronPrinter">Electron Printer</button>
    <button @click="electronPrint">Electron Print</button>
  </div>
</template>

<script>
  import printer from 'printer'
  import { readFile } from '@helpers/files'
  const ele = require('electron')
  export default {
    name: 'Intro',
    data () {
      return {
        img: `static/svg/logo.svg`,
        printdata: null
      }
    },
    created () {

    },
    mounted () {
      console.log(printer)
      readFile(__static + '/ps/lv1.ps').then(
        data => {
          console.log(data)
          this.printdata = data
        }
      )
    },
    methods: {
      electronPrinter () {
        let webContents = ele.remote.getCurrentWebContents()
        let printers = webContents.getPrinters()
        console.log(printers)
      },
      electronPrint () {
        let webContents = ele.remote.getCurrentWebContents()
        // webContents.print({silent: false, printBackground: false, deviceName: 'EPSON-L360-Series'})
        webContents.print()
      },
      getSupportedPrintFormats () {
        let formats
        try {
          formats = printer.getSupportedPrintFormats()
        } catch (error) {
          console.log(error)
        }
        console.log({formats: formats})
      },
      getPrinters () {
        let printers
        try {
          printers = printer.getPrinters()
        } catch (error) {
          console.log(error)
        }
        console.log(printers)
      },
      getPrinterDriverOptions () {
        let printedDriverOptions
        try {
          printedDriverOptions = printer.getPrinterDriverOptions()
        } catch (error) {
          console.log(error)
        }
        console.log(printedDriverOptions)
      },
      getPrinter () {
        try {
          this.formats = printer.getPrinter()
        } catch (error) {
          console.log(error)
        }
      },
      getSelectedPaperSize () {
        try {
          printer.getSelectedPaperSize()
        } catch (error) {
          console.log(error)
        }
      },
      getSupportedJobCommands () {
        let jobs
        try {
          jobs = printer.getSupportedJobCommands()
        } catch (error) {
          console.log(error)
        }
        console.log({jobs: jobs})
      },
      print () {
        printer.printDirect(
          {
            data: this.printdata,//'print from Node.JS buffer', // or simple String: "some text"
            printer: 'EPSON L360 Series', //, printer:'Foxit Reader PDF Printer' // printer name, if missing then will print to default printer
            type: 'RAW', // type: RAW, TEXT, PDF, JPEG, .. depends on platform
            success: function (jobID) {
              console.log("sent to printer with ID: "+jobID)
            },
            error: function (err) {
              console.log(err)
            }
          }
        )
      }
    }
  }
</script>

<style lang="scss" scoped>
  .printer {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: rgba(black, .3);
  }
  .printer .main {
    flex: 1;
  }
</style>

