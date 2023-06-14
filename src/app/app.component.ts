import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  checkFilter:boolean = false
  title = 'checkAuthen';
  content: any
  result: any
  data: any
  dataFilter: any
  dataShowTable:any=[]
  constructor(private http:HttpClient) {

  }

  gen() {
    this.checkFilter = false
    this.data = JSON.parse(this.content).log.entries
    this.data = this.data.filter((e: any) => e.request.method !== 'OPTIONS')
  }

  filter() {
    this.dataShowTable = []
    this.checkFilter = false
    this.data = JSON.parse(this.content).log.entries
    this.data = this.data.filter((e: any) => e.request.method !== 'OPTIONS')
    let check: any = [];
    for (let i = 0; i < this.data.length; i++) {
      check.push(this.data[i].request.url)
    }
    // Step 1
    const uniqueSet = new Set(check);
    this.dataFilter = [...uniqueSet];
    this.dataFilter = this.dataFilter.filter((e:any)=>e.includes('https://cbxapi.ziz.vn/api'))
    this.show(this.dataFilter)
  }

  show(data:any){
    for(let i =0;i<data.length;i++){
      this.http.get(data[i]).subscribe(res=>{
        console.log(res)
        this.dataShowTable.push(
          {url:data[i] , status:"Lỗi phải login"}
        )
      },(err:any)=>{
        console.log("Phải đăng nhập",err.error.url)
        this.dataShowTable.push(
          {url:data[i] , status:"OK"}
        )
      })
    }
    
  }
}
