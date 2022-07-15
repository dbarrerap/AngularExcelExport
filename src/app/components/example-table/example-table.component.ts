import { Component, OnInit } from '@angular/core';
import { ExampleTableService } from './example-table.service';
import { Fill, Workbook } from 'exceljs';
import * as fs from 'file-saver'

@Component({
  selector: 'app-example-table',
  templateUrl: './example-table.component.html',
  styleUrls: ['./example-table.component.css']
})
export class ExampleTableComponent implements OnInit {
  data: any

  constructor(private api: ExampleTableService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.loadData()
    }, 50)
  }

  loadData() {
    this.api.getData()?.subscribe(
      res => {
        this.data = res
      }
    )
  }

  dlExcel() {
    // Generar el Excel
    let wb = new Workbook()
    let ws = wb.addWorksheet('User Data')
    let header = Object.keys(this.data[0])
    ws.addRow(header)

    ws.eachRow((r, rN) => {
      r.eachCell((c, cN) => {
        c.font = {
          bold: true
        }
        c.alignment = {
          horizontal: 'center',
          vertical: 'middle'
        }
      })
    })

    let azul : Fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb:'b8daff' }
    }

    let verde : Fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb:'c3e6cb' }
    }

    let amarillo : Fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb:'ffeeba' }
    }

    // Object.assign(ws.getCell('B1').fill, azul)
    // Object.assign(ws.getCell('C1').fill, verde)
    // Object.assign(ws.getCell('D1').fill, amarillo)
    // Object.assign(ws.getCell('E1').fill, verde)
    // Object.assign(ws.getCell('F1').fill, azul)

    ws.getCell('B1').fill = azul
    ws.getCell('C1').fill = verde
    ws.getCell('D1').fill = amarillo
    ws.getCell('E1').fill = verde
    ws.getCell('F1').fill = azul
    

    this.data.forEach((elem: { [x: string]: any; }) => {
      let keys = Object.keys(elem)
      let row = []
      for (let data of keys) {
        row.push(elem[data])
      }
      ws.addRow(row)
    });

    // Guardar el archivo
    let filename = 'Users'
    wb.xlsx.writeBuffer().then(
      data => {
        let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
        fs.saveAs(blob, filename + new Date().valueOf() + '.xlsx')
      }
    )
  }

}
