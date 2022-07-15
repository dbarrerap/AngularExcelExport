import { Component, OnInit } from '@angular/core';
import { ExampleTableService } from './example-table.service';
import { Workbook } from 'exceljs';
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
    let wb = new Workbook()
    let ws = wb.addWorksheet('User Data')
    let header = Object.keys(this.data[0])
    ws.addRow(header)

    this.data.forEach((elem: { [x: string]: any; }) => {
      let keys = Object.keys(elem)
      let row = []
      for (let data of keys) {
        row.push(elem[data])
      }
      ws.addRow(row)
    });

    let filename = 'Users'
    wb.xlsx.writeBuffer().then(
      data => {
        let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
        fs.saveAs(blob, filename + new Date().valueOf() + '.xlsx')
      }
    )
  }

}
