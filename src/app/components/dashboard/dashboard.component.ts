import { TownshipService } from 'src/app/shared/services/township.service';
import { Township } from './../../shared/models/township.model';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  townships: Township[];
  model = new Township(null,0);
  closeResult: string;
  submitted : boolean = false;

  constructor(public townshipsService: TownshipService, public authService: AuthService, private modalService: NgbModal) { }

  ngOnInit() {
    this.townshipsService.getTownshipsByName().subscribe(tasks => {
      this.townships = tasks;
    });
  }

  showAddAge( content) {
    this.model = new Township(null,0);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;  
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    }

    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
    }

  onSubmit() {
    // this.model.aantal = 0;
    this.townshipsService.addTask(this.model);
  }

  incrementAge(township: Township) {
    township.amount++;
    this.townshipsService.updateAge(township);
  }

  decrementAge(township: Township) {
    township.amount--;
    this.townshipsService.updateAge(township);
  }

  deleteTask(event, township: Township) {
    const response = confirm('Weet je zeker dat je dit gehucht wilt verwijderen?');
    if (response ) {
      this.townshipsService.deleteAge(township);
    }
    return;
  }
}
