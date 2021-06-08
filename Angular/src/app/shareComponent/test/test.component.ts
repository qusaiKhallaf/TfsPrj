import { element, browser } from 'protractor';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BackendServiceService } from './../../Services/backend-service.service';
import {Chart} from 'node_modules/chart.js';

import jsPDF from 'jspdf'
// import jsPDF = require('jspdf') // // typescript without esModuleInterop flag
// import jsPDF from 'yworks-pdf' // using yworks fork
// import jsPDF from 'jspdf/dist/jspdf.node.debug' // for nodejs
import autoTable from 'jspdf-autotable'
import { fromEvent } from 'rxjs';
import { scan } from 'rxjs/operators';

import {TranslateService} from '@ngx-translate/core';
import { transition } from '@angular/animations';

@Component({
  selector: 'test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})

export class TestComponent implements OnInit {



  constructor(public BackendServiceService: BackendServiceService) {
   
    //translate.addLangs(['ar' , 'en']);
    //translate.setDefaultLang('en');
    //const browserLang = translate.getBrowserLang();
    //translate.use(browserLang.match(/en|ar/) ?  browserLang  : 'en' );
    //// translate.getParsedResult('','',{  })

    BackendServiceService.get('https://jsonplaceholder.typicode.com/posts').then(data => {
    //  this.listOfUser = data;
       console.log(data);
    });
}


   // testData = "qusai";

  // listOfUser :any  ;  

  // constructor(BackendServiceService : BackendServiceService) { 
  
    
  // }

  ngOnInit(): void {



    //fromEvent(document, 'click')
    //.pipe(scan(count => count + 1, 0 ))
    //.subscribe(count => console.log(`Clicked ${count} times`));


//     var myChart = new Chart("MyChart", {
//       type: 'bar',
//       data: {
//           labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//           datasets: [{
//               label: '# of Votes',
//               data: [12, 19, 3, 5, 2, 3],
//               backgroundColor: [
//                   'rgba(255, 99, 132, 0.2)',
//                   'rgba(54, 162, 235, 0.2)',
//                   'rgba(255, 206, 86, 0.2)',
//                   'rgba(75, 192, 192, 0.2)',
//                   'rgba(153, 102, 255, 0.2)',
//                   'rgba(255, 159, 64, 0.2)'
//               ],
//               borderColor: [
//                   'rgba(255, 99, 132, 1)',
//                   'rgba(54, 162, 235, 1)',
//                   'rgba(255, 206, 86, 1)',
//                   'rgba(75, 192, 192, 1)',
//                   'rgba(153, 102, 255, 1)',
//                   'rgba(255, 159, 64, 1)'
//               ],
//               borderWidth: 1
//           }]
//       },
//       options: {
//           scales: {
//               yAxes: [{
//                   ticks: {
//                       beginAtZero: true
//                   }
//               }]
//           }
//       }
//   });


  }

  // get testDataProp() {
  //   return "fff";
  // }


  // public downlodePDF() {
  //   var table = document.getElementById("table");
  //   const doc = new jsPDF()
  //   autoTable(doc, { html: '#table', startY: 30, styles: { halign: 'center', fillColor: [22, 160, 133] } });
  //   doc.save('table.pdf');
  // }

  

  
}


